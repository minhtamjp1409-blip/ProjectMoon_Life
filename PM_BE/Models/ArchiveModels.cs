using System.Text.Json;
using System.Text.Json.Serialization;

namespace ProjectMoon.Api.Models;

// Every field a client sends may be missing; records default them so a partial
// payload from an older frontend never turns into a 500.

public sealed record BloodlineMemorialDto(
    int Generation = 1,
    string Seed = "",
    string Name = "",
    int Age = 0,
    string RegionId = "",
    string RegionNameVi = "",
    string RegionNameEn = "",
    string Job = "",
    string EpitaphTitleVi = "",
    string EpitaphTitleEn = "",
    string RankTier = "",
    string DeathCauseVi = "",
    string DeathCauseEn = "",
    int Wealth = 0,
    int Rep = 0,
    int Network = 0,
    List<string>? Scars = null,
    string Relic = "",
    bool HasChild = false,
    string ChildName = "",
    bool HasVendetta = false,
    DateTime? CreatedAtUtc = null,
    string AmbitionId = "",
    bool AmbitionAchieved = false,
    bool EnsembleScore = false
);

public sealed record CustomChoiceDto(
    string LabelVi = "",
    string LabelEn = "",
    string ResultVi = "",
    string ResultEn = "",
    Dictionary<string, int>? Effects = null
);

public sealed record CustomEventDto(
    string Id = "",
    int[]? Age = null,
    bool Major = true,
    double Weight = 1,
    string Vi = "",
    string En = "",
    List<CustomChoiceDto>? Choices = null
);

public sealed record CityTelemetryDto(
    int TotalLivesLived = 0,
    int TotalDeaths = 0,
    int HighestGeneration = 1,
    int ColorFixersAscended = 0,
    int EgoAwakenings = 0,
    int DistortionsBorn = 0,
    int LongestLife = 0
);

public sealed record GameplaySampleDto(
    string RunKey = "",
    int Age = 0,
    int Minutes = 0,
    string FirstDungeonOutcome = "none",
    bool Abandoned = false
);

public sealed record GameplayMetricsDto(
    int Lives = 0,
    int TotalAge = 0,
    int TotalMinutes = 0,
    int FirstDungeonVisits = 0,
    int FirstDungeonDeaths = 0,
    int AbandonedRuns = 0,
    Dictionary<string, int>? FirstDungeonOutcomes = null,
    List<string>? RecordedRuns = null
);

public sealed record ArchiveSnapshotDto(
    List<BloodlineMemorialDto> PastLives,
    List<string> GlobalCodex,
    List<CustomEventDto> CustomEvents,
    CityTelemetryDto Telemetry
);

public sealed record CodexSyncRequest(List<string>? Keys = null);

/// <summary>
/// A life in progress. The character is kept as raw JSON: the backend stores and
/// returns it untouched, so the frontend can change its shape without a migration here.
/// </summary>
public sealed record RunStateDto(
    JsonElement Char,
    double YearProgress = 0,
    string? SavedAt = null,
    int Version = 0,
    uint[]? RngState = null,
    int ActivePlayMs = 0
);

public sealed record HallOfFameEntryDto(
    string Name,
    int Age,
    int Generation,
    string RankTier,
    string EpitaphTitleVi,
    string EpitaphTitleEn,
    string DeathCauseVi,
    string DeathCauseEn
);

public sealed record HealthDto(string Status, string Engine, double MemoryMb, int PendingWrites, DateTime TimestampUtc);

public sealed record CustomEventsResponse(List<CustomEventDto> CustomEvents);
public sealed record CodexResponse(List<string> GlobalCodex);

/// <summary>Compile-time JSON metadata: no reflection on the request path.</summary>
[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(ArchiveSnapshotDto))]
[JsonSerializable(typeof(BloodlineMemorialDto))]
[JsonSerializable(typeof(CustomEventDto))]
[JsonSerializable(typeof(CodexSyncRequest))]
[JsonSerializable(typeof(CodexResponse))]
[JsonSerializable(typeof(CustomEventsResponse))]
[JsonSerializable(typeof(RunStateDto))]
[JsonSerializable(typeof(Dictionary<string, RunStateDto>))]
[JsonSerializable(typeof(List<HallOfFameEntryDto>))]
[JsonSerializable(typeof(CityTelemetryDto))]
[JsonSerializable(typeof(GameplaySampleDto))]
[JsonSerializable(typeof(GameplayMetricsDto))]
[JsonSerializable(typeof(HealthDto))]
public sealed partial class AppJsonContext : JsonSerializerContext;
