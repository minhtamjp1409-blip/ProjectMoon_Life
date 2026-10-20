using System.Collections.Frozen;
using System.Diagnostics;
using ProjectMoon.Api.Models;

namespace ProjectMoon.Api.Services;

public readonly record struct AiWeights(double Causal, double Lore, double Npc, double Crisis, double Relief);

/// <summary>
/// Ultra-fast C# Weaver AI Utility Scorer using FrozenDictionary and Span-friendly loops.
/// </summary>
public sealed class WeaverAiEngineService
{
    private static readonly FrozenDictionary<string, AiWeights> ModeWeights =
        new Dictionary<string, AiWeights>(StringComparer.OrdinalIgnoreCase)
        {
            ["balanced"] = new(1.35, 1.20, 1.25, 1.00, 1.15),
            ["merciless"] = new(1.65, 1.15, 1.00, 1.55, 0.65),
            ["saga"] = new(1.45, 1.35, 1.60, 0.95, 1.25)
        }.ToFrozenDictionary(StringComparer.OrdinalIgnoreCase);

    public WeaverEvaluationResponse Evaluate(WeaverEvaluationRequest req)
    {
        var sw = Stopwatch.GetTimestamp();

        var weights = ModeWeights.GetValueOrDefault(req.Mode ?? "balanced", ModeWeights["balanced"]);

        // 1. Compute Tension Score (0 - 100)
        double rawTension = 15.0
            + Math.Min(30.0, req.Heat * 0.45)
            + Math.Min(25.0, req.Taboo * 9.0)
            + Math.Max(0.0, (55 - req.Sanity) * 0.6)
            + Math.Max(0.0, (50 - req.Health) * 0.45)
            + (req.DueSoonThreadsCount * 12.0)
            + Math.Min(18.0, req.Resonance * 0.25);

        int tension = (int)Math.Clamp(Math.Round(rawTension), 5, 100);

        // 2. Determine Drama Phase
        string phase = "INCUBATION";
        if (req.YearsSinceLastCrisis <= 1 && tension < 78)
        {
            phase = "AFTERMATH";
        }
        else if (tension >= 68 || req.DueSoonThreadsCount > 0 || req.Sanity <= 18 || req.Taboo >= 3)
        {
            phase = "CLIMAX";
        }
        else if (tension >= 38 || req.ActiveThreadsCount > 0 || req.Age >= 17)
        {
            phase = "RISING_TENSION";
        }

        // 3. Score Candidates
        var candidates = req.Candidates ?? new List<CandidateEventInput>();
        var ranked = new List<ScoredCandidateDto>(candidates.Count);

        foreach (var ev in candidates)
        {
            double baseScore = ev.Weight > 0 ? ev.Weight : 5.0;
            double causal = 0;
            double lore = 0;
            double npc = 0;
            double pacing = 0;
            string reasonVi = "Phù hợp độ tuổi và bối cảnh khu vực";

            if (ev.Requires is { Count: > 0 })
            {
                bool isLegacy = ev.Requires.Any(r => r is "HuyếtThốngKếThừa" or "NợMáuĐờiTrước");
                causal += (isLegacy ? 18.0 : 8.0) * weights.Causal;
                reasonVi = isLegacy
                    ? "Liên kết trực tiếp Huyết Thống đời trước (+Causal)"
                    : $"Khớp điều kiện Nhân Quả [{string.Join(", ", ev.Requires)}]";
            }

            if (ev.Regions is { Count: > 0 } && ev.Regions.Contains(req.RegionId))
            {
                lore += 10.0 * weights.Lore;
                reasonVi = $"Sự kiện đặc trưng của District {req.RegionId} (+Lore)";
            }

            if (ev.Jobs is { Count: > 0 } && ev.Jobs.Contains(req.Job))
            {
                lore += 9.0 * weights.Lore;
            }

            if (ev.Id.StartsWith("life_", StringComparison.Ordinal))
            {
                npc += (7.0 + req.ActiveNpcsCount * 3.5) * weights.Npc;
                reasonVi = "Phát triển mạch truyện Nhân Mạch & Gia Đình (+NPC)";
            }

            if (phase == "CLIMAX" && (ev.Id.Contains("showdown") || ev.Id.Contains("carmen") || ev.Id.Contains("maestro")))
            {
                pacing += 14.0 * weights.Crisis;
                reasonVi = "Đẩy cao trào Đỉnh Điểm Sinh Tử (Climax)";
            }

            double total = Math.Round(baseScore + causal + lore + npc + pacing, 1);
            ranked.Add(new ScoredCandidateDto(
                EventId: ev.Id,
                TotalUtility: total,
                BaseScore: Math.Round(baseScore, 1),
                CausalScore: Math.Round(causal, 1),
                LoreScore: Math.Round(lore, 1),
                NpcScore: Math.Round(npc, 1),
                PacingScore: Math.Round(pacing, 1),
                ReasonVi: reasonVi
            ));
        }

        ranked.Sort((a, b) => b.TotalUtility.CompareTo(a.TotalUtility));

        var elapsedMs = Stopwatch.GetElapsedTime(sw).TotalMilliseconds;
        return new WeaverEvaluationResponse(
            DramaPhase: phase,
            TensionScore: tension,
            RankedCandidates: ranked,
            ExecutionTimeMs: Math.Round(elapsedMs, 4)
        );
    }
}
