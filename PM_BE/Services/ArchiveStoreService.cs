using System.Text.Json;
using System.Text.Json.Serialization.Metadata;
using System.Security.Cryptography;
using System.Text;
using ProjectMoon.Api.Models;

namespace ProjectMoon.Api.Services;

/// <summary>
/// In-memory archive with write-behind persistence.
///
/// Reads return the current immutable snapshot without locking. Writes swap in a new
/// snapshot under a short lock and only mark the file dirty; <see cref="ArchiveFlushService"/>
/// writes dirty files in the background, so a burst of saves (the frontend autosaves
/// after every choice) costs one disk write instead of dozens and never blocks a request.
/// Files are written to a temp file and moved over the old one, so a crash mid-write
/// cannot leave a half-written archive.
/// </summary>
public sealed class ArchiveStoreService
{
    private const int MaxLives = 50;
    private const int MaxCustomEvents = 50;
    private const int MaxSlots = 8;

    // Looked up through GetTypeInfo rather than the generated AppJsonContext.Default.X
    // properties: same source-generated metadata at runtime, but the editor's language
    // server does not always see the generator output and flags those properties as missing.
    private static readonly JsonTypeInfo<ArchiveSnapshotDto> ArchiveInfo =
        (JsonTypeInfo<ArchiveSnapshotDto>)AppJsonContext.Default.GetTypeInfo(typeof(ArchiveSnapshotDto))!;
    private static readonly JsonTypeInfo<Dictionary<string, RunStateDto>> RunsInfo =
        (JsonTypeInfo<Dictionary<string, RunStateDto>>)AppJsonContext.Default.GetTypeInfo(typeof(Dictionary<string, RunStateDto>))!;
    private static readonly JsonTypeInfo<GameplayMetricsDto> GameplayInfo =
        (JsonTypeInfo<GameplayMetricsDto>)AppJsonContext.Default.GetTypeInfo(typeof(GameplayMetricsDto))!;

    private readonly string _archivePath;
    private readonly string _statePath;
    private readonly string _gameplayPath;
    private readonly ILogger<ArchiveStoreService> _log;
    private readonly object _gate = new();

    private volatile ArchiveSnapshotDto _snapshot;
    private volatile Dictionary<string, RunStateDto> _runs;
    private volatile GameplayMetricsDto _gameplay;
    private int _archiveDirty;
    private int _stateDirty;
    private int _gameplayDirty;

    public ArchiveStoreService(IWebHostEnvironment env, ILogger<ArchiveStoreService> log, string playerKey)
    {
        _log = log;
        var configuredDataDir = Environment.GetEnvironmentVariable("CITY_DATA_DIR");
        if (!string.IsNullOrWhiteSpace(configuredDataDir) && !Path.IsPathFullyQualified(configuredDataDir))
            throw new InvalidOperationException("CITY_DATA_DIR must be an absolute path.");
        var dataRoot = !string.IsNullOrWhiteSpace(configuredDataDir)
            ? configuredDataDir
            : Path.Combine(env.ContentRootPath, "Data");
        var dataDir = Path.Combine(dataRoot, "players", playerKey);
        Directory.CreateDirectory(dataDir);
        _archivePath = Path.Combine(dataDir, "city_archive.json");
        _statePath = Path.Combine(dataDir, "run_state.json");
        _gameplayPath = Path.Combine(dataDir, "gameplay_metrics.json");
        _snapshot = Normalize(Load(_archivePath, ArchiveInfo));
        _runs = Load(_statePath, RunsInfo) ?? new Dictionary<string, RunStateDto>();
        _gameplay = Load(_gameplayPath, GameplayInfo) ?? new GameplayMetricsDto();
    }

    public int PendingWrites => _archiveDirty + _stateDirty + _gameplayDirty;

    public bool RecordGameplaySample(GameplaySampleDto sample)
    {
        if (string.IsNullOrWhiteSpace(sample.RunKey) || sample.RunKey.Length > 80 ||
            sample.Age < 0 || sample.Age > 200 || sample.Minutes < 0 || sample.Minutes > 100000 ||
            !new[] { "none", "conquered", "fled", "broken", "restored", "dead", "library" }.Contains(sample.FirstDungeonOutcome)) return false;
        var key = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(sample.RunKey))).ToLowerInvariant();
        lock (_gate)
        {
            var current = _gameplay;
            if (current.RecordedRuns?.Contains(key) == true) return true;
            var outcomes = new Dictionary<string, int>(current.FirstDungeonOutcomes ?? new());
            outcomes[sample.FirstDungeonOutcome] = outcomes.GetValueOrDefault(sample.FirstDungeonOutcome) + 1;
            var recorded = new List<string>(current.RecordedRuns ?? new()) { key };
            if (recorded.Count > MaxLives) recorded.RemoveRange(0, recorded.Count - MaxLives);
            _gameplay = current with {
                Lives = current.Lives + 1,
                TotalAge = current.TotalAge + sample.Age,
                TotalMinutes = current.TotalMinutes + sample.Minutes,
                FirstDungeonVisits = current.FirstDungeonVisits + (sample.FirstDungeonOutcome == "none" ? 0 : 1),
                FirstDungeonDeaths = current.FirstDungeonDeaths + (sample.FirstDungeonOutcome == "dead" ? 1 : 0),
                AbandonedRuns = current.AbandonedRuns + (sample.Abandoned ? 1 : 0),
                FirstDungeonOutcomes = outcomes,
                RecordedRuns = recorded
            };
            Interlocked.Exchange(ref _gameplayDirty, 1);
            return true;
        }
    }

    public ArchiveSnapshotDto GetSnapshot() => _snapshot;

    public CityTelemetryDto GetTelemetry() => _snapshot.Telemetry;

    public List<HallOfFameEntryDto> GetHallOfFame(int take) =>
        _snapshot.PastLives
            .OrderByDescending(p => p.Generation)
            .ThenByDescending(p => p.Age)
            .Take(Math.Clamp(take, 1, 50))
            .Select(p => new HallOfFameEntryDto(p.Name, p.Age, p.Generation, p.RankTier, p.EpitaphTitleVi, p.EpitaphTitleEn, p.DeathCauseVi, p.DeathCauseEn))
            .ToList();

    public ArchiveSnapshotDto AddMemorial(BloodlineMemorialDto memorial)
    {
        lock (_gate)
        {
            var current = _snapshot;
            var enriched = memorial with { Scars = memorial.Scars ?? new List<string>(), CreatedAtUtc = DateTime.UtcNow };
            if (current.PastLives.Any(p => p.Seed == enriched.Seed && p.Age == enriched.Age))
            {
                return current; // the same death reported twice (a retry, two tabs)
            }

            var pastLives = new List<BloodlineMemorialDto>(MaxLives) { enriched };
            pastLives.AddRange(current.PastLives.Take(MaxLives - 1));

            var t = current.Telemetry;
            var title = enriched.EpitaphTitleVi ?? string.Empty;
            var scars = enriched.Scars;
            var nextTelemetry = t with
            {
                TotalLivesLived = t.TotalLivesLived + 1,
                TotalDeaths = t.TotalDeaths + 1,
                HighestGeneration = Math.Max(t.HighestGeneration, enriched.Generation),
                ColorFixersAscended = t.ColorFixersAscended + (title.Contains("Color", StringComparison.OrdinalIgnoreCase) ? 1 : 0),
                EgoAwakenings = t.EgoAwakenings + (title.Contains("E.G.O", StringComparison.OrdinalIgnoreCase) ? 1 : 0),
                DistortionsBorn = t.DistortionsBorn + (scars.Any(s => s.Contains("Distortion", StringComparison.OrdinalIgnoreCase)) ? 1 : 0),
                LongestLife = Math.Max(t.LongestLife, enriched.Age)
            };

            _snapshot = current with { PastLives = pastLives, Telemetry = nextTelemetry };
            Interlocked.Exchange(ref _archiveDirty, 1);
            return _snapshot;
        }
    }

    public ArchiveSnapshotDto DeleteMemorial(string seed, int age)
    {
        lock (_gate)
        {
            var current = _snapshot;
            var pastLives = current.PastLives.Where(p => !(p.Seed == seed && p.Age == age)).ToList();
            _snapshot = current with { PastLives = pastLives };
            Interlocked.Exchange(ref _archiveDirty, 1);
            return _snapshot;
        }
    }

    public ArchiveSnapshotDto ClearMemorials()
    {
        lock (_gate)
        {
            var current = _snapshot;
            _snapshot = current with { PastLives = new List<BloodlineMemorialDto>() };
            Interlocked.Exchange(ref _archiveDirty, 1);
            return _snapshot;
        }
    }

    public List<string> SyncCodex(IEnumerable<string>? keys)
    {
        if (keys == null) return _snapshot.GlobalCodex;

        lock (_gate)
        {
            var current = _snapshot;
            HashSet<string>? set = null;
            List<string>? merged = null;

            foreach (var key in keys)
            {
                if (string.IsNullOrWhiteSpace(key)) continue;
                set ??= new HashSet<string>(current.GlobalCodex, StringComparer.Ordinal);
                if (set.Add(key))
                {
                    merged ??= new List<string>(current.GlobalCodex);
                    merged.Add(key);
                }
            }

            if (merged != null)
            {
                _snapshot = current with { GlobalCodex = merged };
                Interlocked.Exchange(ref _archiveDirty, 1);
            }
            return _snapshot.GlobalCodex;
        }
    }

    public List<CustomEventDto> AddCustomEvent(CustomEventDto customEvent)
    {
        lock (_gate)
        {
            var current = _snapshot;
            var next = new List<CustomEventDto>(MaxCustomEvents) { customEvent };
            next.AddRange(current.CustomEvents.Where(e => e.Id != customEvent.Id).Take(MaxCustomEvents - 1));
            _snapshot = current with { CustomEvents = next };
            Interlocked.Exchange(ref _archiveDirty, 1);
            return _snapshot.CustomEvents;
        }
    }

    public RunStateDto? GetRun(string slot) => _runs.TryGetValue(slot, out var run) ? run : null;

    public void SaveRun(string slot, RunStateDto run)
    {
        lock (_gate)
        {
            var next = new Dictionary<string, RunStateDto>(_runs) { [slot] = run };
            if (next.Count > MaxSlots)
            {
                foreach (var stale in next.Keys.Where(k => k != slot).Take(next.Count - MaxSlots).ToList()) next.Remove(stale);
            }
            _runs = next;
            Interlocked.Exchange(ref _stateDirty, 1);
        }
    }

    public bool DeleteRun(string slot)
    {
        lock (_gate)
        {
            if (!_runs.ContainsKey(slot)) return false;
            var next = new Dictionary<string, RunStateDto>(_runs);
            next.Remove(slot);
            _runs = next;
            Interlocked.Exchange(ref _stateDirty, 1);
            return true;
        }
    }

    /// <summary>Writes whatever changed since the last flush. Called by the background flusher.</summary>
    public async Task FlushAsync(CancellationToken ct)
    {
        if (Interlocked.Exchange(ref _archiveDirty, 0) == 1)
        {
            await WriteAtomicAsync(_archivePath, _snapshot, ArchiveInfo, ct);
        }
        if (Interlocked.Exchange(ref _stateDirty, 0) == 1)
        {
            await WriteAtomicAsync(_statePath, _runs, RunsInfo, ct);
        }
        if (Interlocked.Exchange(ref _gameplayDirty, 0) == 1)
        {
            await WriteAtomicAsync(_gameplayPath, _gameplay, GameplayInfo, ct);
        }
    }

    private async Task WriteAtomicAsync<T>(string path, T value, JsonTypeInfo<T> info, CancellationToken ct)
    {
        var tmp = path + ".tmp";
        try
        {
            await using (var stream = new FileStream(tmp, FileMode.Create, FileAccess.Write, FileShare.None, 16384, useAsync: true))
            {
                await JsonSerializer.SerializeAsync(stream, value, info, ct);
            }
            if (File.Exists(path)) File.Copy(path, path + ".bak", overwrite: true);
            File.Move(tmp, path, overwrite: true);
        }
        catch (Exception ex) when (ex is IOException or UnauthorizedAccessException)
        {
            _log.LogWarning(ex, "Could not write {Path}; will retry on the next flush", path);
            if (path == _archivePath) Interlocked.Exchange(ref _archiveDirty, 1);
            else Interlocked.Exchange(ref _stateDirty, 1);
        }
    }

    private T? Load<T>(string path, JsonTypeInfo<T> info) where T : class
    {
        try
        {
            if (!File.Exists(path) || new FileInfo(path).Length == 0) return null;
            using var stream = File.OpenRead(path);
            return JsonSerializer.Deserialize(stream, info);
        }
        catch (Exception ex) when (ex is JsonException or IOException)
        {
            _log.LogWarning(ex, "Unreadable {Path}; checking backup", path);
            try { File.Copy(path, path + ".bad", overwrite: true); } catch (IOException) { }
            try
            {
                using var backup = File.OpenRead(path + ".bak");
                return JsonSerializer.Deserialize(backup, info);
            }
            catch (Exception backupEx) when (backupEx is JsonException or IOException)
            {
                _log.LogWarning(backupEx, "Unreadable backup for {Path}; starting fresh", path);
            }
            return null;
        }
    }

    private static ArchiveSnapshotDto Normalize(ArchiveSnapshotDto? data) => new(
        PastLives: data?.PastLives ?? new List<BloodlineMemorialDto>(),
        GlobalCodex: data?.GlobalCodex ?? new List<string> { "born_city" },
        CustomEvents: data?.CustomEvents ?? new List<CustomEventDto>(),
        Telemetry: data?.Telemetry ?? new CityTelemetryDto()
    );
}

/// <summary>Flushes the archive every second when something changed, and once more on shutdown.</summary>
public sealed class ArchiveFlushService(PlayerArchiveRegistry registry) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(1));
        try
        {
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                await registry.FlushAsync(stoppingToken);
            }
        }
        catch (OperationCanceledException)
        {
            // shutting down
        }
    }

    public override async Task StopAsync(CancellationToken cancellationToken)
    {
        await base.StopAsync(cancellationToken);
        await registry.FlushAsync(CancellationToken.None);
    }
}
