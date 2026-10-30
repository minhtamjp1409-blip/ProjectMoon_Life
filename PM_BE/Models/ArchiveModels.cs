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

public sealed record CandidateEventInput(
    string Id,
    double Weight,
    List<string>? Regions,
    List<string>? Jobs,
    List<string>? Requires
);

public sealed record WeaverEvaluationRequest(
    string Mode,
    int Age,
    string RegionId,
    string Job,
    int Health,
    int Sanity,
    int Heat,
    int Taboo,
    int Resonance,
    int DueSoonThreadsCount,
    int ActiveThreadsCount,
    int ActiveNpcsCount,
    int YearsSinceLastCrisis,
    List<string> Flags,
    List<CandidateEventInput> Candidates
);

public sealed record ScoredCandidateDto(
    string EventId,
    double TotalUtility,
    double BaseScore,
    double CausalScore,
    double LoreScore,
    double NpcScore,
    double PacingScore,
    string ReasonVi
);

public sealed record WeaverEvaluationResponse(
    string DramaPhase,
    int TensionScore,
    List<ScoredCandidateDto> RankedCandidates,
    double ExecutionTimeMs
);

public sealed record PendingThreadDto(
    string Id = "",
    string EventId = "",
    int TriggerAge = 0,
    bool Fulfilled = false,
    string Kind = "",
    string ReasonVi = "",
    string ReasonEn = ""
);

public sealed record CharacterSnapshotDto(
    int Age = 0,
    string Job = "Child",
    string RegionId = "1",
    int Health = 50,
    int Sanity = 50,
    int Wealth = 0,
    int Network = 0,
    int Rep = 0,
    int Merit = 0,
    int Heat = 0,
    int Taboo = 0,
    int Resonance = 0,
    int FixerGrade = 9,
    string? Finger = null,
    int FingerRank = 0,
    int WingRank = 0,
    int WorkshopRank = 0,
    List<string>? Flags = null,
    List<string>? SeenEvents = null,
    List<string>? Recent = null,
    string FateOmenId = "",
    int YearsSinceLastMajor = 0,
    int ActiveNpcsCount = 0,
    List<PendingThreadDto>? PendingThreads = null,
    int AnnualTrain = 0,
    int AnnualWork = 0,
    int AnnualBond = 0,
    int AnnualRest = 0,
    int AnnualScheme = 0,
    string Ambition = "",
    int SyndicateRank = 0,
    bool HasRelic = false
);

public sealed record MilestoneRequirementDto(
    string LabelVi,
    string LabelEn,
    int Current,
    int Target,
    bool Met
);

public sealed record CareerMilestoneDto(
    string Category,
    string TitleVi,
    string TitleEn,
    int ProgressPct,
    List<MilestoneRequirementDto> Requirements,
    string TipVi,
    string TipEn,
    bool CanPromote = false,
    string NextRankTitleVi = "",
    string NextRankTitleEn = ""
);

public sealed record PlanMomentDto(
    double T,
    string Kind,
    string Id = "",
    string ForcedEventId = "",
    string Thread = "",
    string Season = "Spring",
    int SeasonIdx = 0,
    bool IsCausal = false,
    string TitleVi = "",
    string TitleEn = ""
);

public sealed record PlanYearRequestDto(
    CharacterSnapshotDto Char,
    string Seed = ""
);

public sealed record PlanYearResponseDto(
    List<PlanMomentDto> Moments,
    string DramaPhase,
    int TensionScore,
    double ExecutionTimeMs
);

public sealed record CrucibleTrialRequestDto(
    string TrialType,
    CharacterSnapshotDto Char,
    string ChoiceId = "",
    int Resonance = 0,
    int Sanity = 0
);

public sealed record CrucibleTrialResponseDto(
    bool Success,
    string OutcomeType,
    string TitleVi,
    string TitleEn,
    string DescriptionVi,
    string DescriptionEn,
    List<string> FlagsToAdd,
    List<string> FlagsToRemove,
    int MeritDelta,
    int SanityDelta,
    int HealthDelta,
    int RepDelta,
    string EpitaphVi,
    string EpitaphEn
);

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
[JsonSerializable(typeof(WeaverEvaluationRequest))]
[JsonSerializable(typeof(WeaverEvaluationResponse))]
[JsonSerializable(typeof(PendingThreadDto))]
[JsonSerializable(typeof(CharacterSnapshotDto))]
[JsonSerializable(typeof(MilestoneRequirementDto))]
[JsonSerializable(typeof(CareerMilestoneDto))]
[JsonSerializable(typeof(PlanMomentDto))]
[JsonSerializable(typeof(PlanYearRequestDto))]
[JsonSerializable(typeof(PlanYearResponseDto))]
[JsonSerializable(typeof(CrucibleTrialRequestDto))]
[JsonSerializable(typeof(CrucibleTrialResponseDto))]
public sealed partial class AppJsonContext : JsonSerializerContext;
