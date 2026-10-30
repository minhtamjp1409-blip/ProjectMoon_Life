using System.Reflection;
using System.Text.Json;

namespace ProjectMoon.Api.Services;

/// <summary>
/// Promotion gates, read from the embedded Data/career_gates.json.
/// The frontend reads a copy of the same file (PM/src/data/careerGates.json), so both sides always agree.
/// </summary>
public static class CareerGates
{
    public readonly record struct FixerGate(int Grade, int Merit, int Rep);
    public readonly record struct FingerGate(int Rank, int Merit, int Rep, int Network);
    public readonly record struct WingGate(int Rank, int Merit, int Wealth, int Network);

    private sealed record ColorGate(int Merit, int Rep);

    private sealed record Document(
        FixerGate[] Fixer,
        ColorGate Color,
        FingerGate[] Finger,
        Dictionary<string, string[]> FingerRanks,
        WingGate[] Wing);

    private static readonly Document Doc = Load();

    public static IReadOnlyList<FixerGate> Fixer => Doc.Fixer;
    public static IReadOnlyList<FingerGate> Finger => Doc.Finger;
    public static IReadOnlyList<WingGate> Wing => Doc.Wing;
    public static IReadOnlyDictionary<string, string[]> FingerRanks => Doc.FingerRanks;
    public static int ColorMerit => Doc.Color.Merit;
    public static int ColorRep => Doc.Color.Rep;

    public static FingerGate FingerAt(int rank) => Doc.Finger.First(g => g.Rank == rank);
    public static WingGate WingAt(int rank) => Doc.Wing.First(g => g.Rank == rank);

    private static Document Load()
    {
        using var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream("career_gates.json")
            ?? throw new InvalidOperationException("career_gates.json is not embedded in the assembly");
        return JsonSerializer.Deserialize<Document>(stream, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
            ?? throw new InvalidOperationException("career_gates.json is empty");
    }
}
