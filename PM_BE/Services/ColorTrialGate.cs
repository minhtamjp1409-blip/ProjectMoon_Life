using ProjectMoon.Api.Models;

namespace ProjectMoon.Api.Services;

/// <summary>
/// When Hana convenes the Color trial. Mirrors careerPipeline.js (isColorEgoRoadEligible, isColorProdigyEligible,
/// colorRequirementFor, checkColorFixerReadiness); every number comes from career_gates.json, the file the client reads.
/// Keep the two in step: tools/sim/color_gate_parity.mjs compares them against a running backend.
/// </summary>
public static class ColorTrialGate
{
    public readonly record struct Requirement(int Merit, int Rep, int Age, string Track);

    private static bool IsFixer(CharacterSnapshotDto c) =>
        c.Job.Equals("Fixer", StringComparison.OrdinalIgnoreCase) || c.Job.Equals("Color Fixer", StringComparison.OrdinalIgnoreCase);

    private static bool Blocked(IReadOnlyCollection<string> flags) => flags.Contains("Distorted") || flags.Contains("ColorFixer");

    public static bool EgoRoad(CharacterSnapshotDto c, IReadOnlyCollection<string> flags)
    {
        var road = CareerGates.Color.EgoRoad;
        if (Blocked(flags) || !IsFixer(c)) return false;
        if (c.Age < road.Age || c.Age > CareerGates.Color.OldestAge) return false;
        if (!road.Grades.Contains(c.FixerGrade) || !flags.Contains("EGOAwakened")) return false;
        return c.Rep >= road.Rep && c.Merit >= road.Merit && c.Resonance >= road.Resonance;
    }

    public static bool Prodigy(CharacterSnapshotDto c, IReadOnlyCollection<string> flags)
    {
        var prodigy = CareerGates.Color.Prodigy;
        if (Blocked(flags) || !IsFixer(c)) return false;
        if (c.Age < prodigy.Age || c.Age > CareerGates.Color.OldestAge) return false;
        if (EgoRoad(c, flags)) return true;
        if (c.Age > prodigy.LatestAge || !prodigy.Grades.Contains(c.FixerGrade)) return false;

        bool hasFeat = prodigy.Feats.Any(flags.Contains);
        if ((c.HasRelic || hasFeat || c.Resonance >= prodigy.Resonance) && c.Rep >= prodigy.Rep && c.Merit >= prodigy.Merit) return true;

        var track = prodigy.EgoTrack;
        return track.Grades.Contains(c.FixerGrade) && flags.Contains("EGOAwakened") && c.Rep >= track.Rep && c.Merit >= track.Merit;
    }

    public static Requirement RequirementFor(CharacterSnapshotDto c, IReadOnlyCollection<string> flags)
    {
        var color = CareerGates.Color;
        if (EgoRoad(c, flags)) return new(color.EgoRoad.Merit, color.EgoRoad.Rep, color.EgoRoad.Age, "egoRoad");
        if (Prodigy(c, flags)) return new(color.Prodigy.Merit, color.Prodigy.Rep, color.Prodigy.Age, "prodigy");
        return flags.Contains("EGOAwakened")
            ? new(color.Ego.Merit, color.Ego.Rep, color.Ego.Age, "ego")
            : new(color.Merit, color.Rep, color.Age, "standard");
    }

    /// <summary>True when the trial can be convened now: the same test as checkColorFixerReadiness on the client.</summary>
    public static bool Ready(CharacterSnapshotDto c, IReadOnlyCollection<string> flags)
    {
        if (!IsFixer(c) || Blocked(flags)) return false;
        if (c.FixerGrade != 1 && !Prodigy(c, flags)) return false;
        var req = RequirementFor(c, flags);
        return c.Age >= req.Age && c.Merit >= req.Merit && c.Rep >= req.Rep;
    }
}
