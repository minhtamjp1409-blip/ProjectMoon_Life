using System.Collections.Frozen;
using System.Diagnostics;
using System.Security.Cryptography;
using ProjectMoon.Api.Models;

namespace ProjectMoon.Api.Services;

/// <summary>
/// High-performance C# Director Engine for Year Planning, Career Milestones, and Crucible Trials.
/// Offloads heavy computational game loops from the browser frontend.
/// </summary>
public sealed class DirectorEngineService
{
    private static readonly string[] Seasons = ["Spring", "Summer", "Autumn", "Winter"];
    private static readonly string[] SeasonsVi = ["Mùa Xuân", "Mùa Hạ", "Mùa Thu", "Mùa Đông"];

    private readonly record struct SeasonBand(double MinT, double MaxT, string Season, string SeasonVi);

    private static readonly SeasonBand[] SeasonBands =
    [
        new(0.08, 0.20, "Spring", "Mùa Xuân"),
        new(0.32, 0.44, "Summer", "Mùa Hạ"),
        new(0.56, 0.68, "Autumn", "Mùa Thu"),
        new(0.80, 0.92, "Winter", "Mùa Đông")
    ];

    private readonly record struct FixerThreshold(int Grade, int Merit, int Rep, string TitleVi, string TitleEn);

    private static readonly FixerThreshold[] FixerThresholds =
    [
        new(8, 10, 8, "Fixer Grade 8", "Grade 8 Fixer"),
        new(7, 22, 16, "Fixer Grade 7", "Grade 7 Fixer"),
        new(6, 38, 26, "Fixer Grade 6", "Grade 6 Fixer"),
        new(5, 56, 38, "Fixer Grade 5", "Grade 5 Fixer"),
        new(4, 78, 52, "Fixer Grade 4", "Grade 4 Fixer"),
        new(3, 105, 68, "Fixer Grade 3", "Grade 3 Fixer"),
        new(2, 150, 82, "Fixer Grade 2", "Grade 2 Fixer"),
        new(1, 200, 95, "Fixer Grade 1", "Grade 1 Fixer")
    ];

    // Both tables mirror careerPipeline.js (FIXER_LADDER, COLOR_FIXER_REQ), which gates the exams
    private const int ColorMerit = 300;
    private const int ColorRep = 95;

    private static double FixerContractOfferChance(CharacterSnapshotDto c)
    {
        var step = FixerThresholds.FirstOrDefault(t => t.Grade == c.FixerGrade - 1);
        int repReq = step.Grade > 0 ? step.Rep : c.FixerGrade == 1 && !(c.Flags?.Contains("ColorFixer") ?? false) ? ColorRep : 0;
        int meritReq = step.Grade > 0 ? step.Merit : c.FixerGrade == 1 && !(c.Flags?.Contains("ColorFixer") ?? false) ? ColorMerit : 0;
        if (repReq == 0) return 0.42;
        int repGap = Math.Max(0, repReq - c.Rep);
        int meritGap = Math.Max(0, meritReq - c.Merit);
        double repChance = repGap > 0 ? 0.54 + 0.18 * Math.Min(1, repGap / Math.Max(10, repReq * 0.25)) : 0.42;
        double meritChance = meritGap > 0 ? 0.50 + 0.10 * Math.Min(1, meritGap / Math.Max(15, meritReq * 0.25)) : 0.42;
        return Math.Max(repChance, meritChance);
    }

    private static readonly FrozenDictionary<string, string[]> FingerLadders =
        new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
        {
            // Same names and order as FINGER_RANKS in PM/src/data/worldData.js
            ["Thumb"] = ["Soldato", "Capo", "Sottocapo", "Underboss"],
            ["Index"] = ["Proselyte", "Messenger", "Proxy", "Weaver"],
            ["Middle"] = ["Little Sibling", "Big Sibling", "Great Elder", "Great Sibling"],
            ["Ring"] = ["Student", "Docent", "Maestro", "Grand Curator"],
            ["Pinky"] = ["Initiate", "Sworn Blade", "Star of the Sky", "Sovereign"]
        }.ToFrozenDictionary(StringComparer.OrdinalIgnoreCase);

    private readonly record struct WingRankDef(int Rank, string TitleVi, string TitleEn, int Merit, int Wealth, int Network);

    private static readonly WingRankDef[] WingRanks =
    [
        new(0, "Nhân viên tập sự (Contract Intern)", "Contract Intern", 0, 0, 0),
        new(1, "Feather chính thức (Feather Agent)", "Feather Agent", 25, 18, 14),
        new(2, "Trưởng phòng ban (Section Chief)", "Section Chief", 65, 45, 32),
        new(3, "Giám đốc cấp cao (Senior Executive)", "Senior Executive", 125, 85, 60)
    ];

    /// <summary>
    /// Evaluates current character career milestone, requirements, progress, and promotion state.
    /// </summary>
    public CareerMilestoneDto EvaluateMilestone(CharacterSnapshotDto c)
    {
        var flags = c.Flags ?? [];

        // 1. Childhood
        if (c.Age < 18 || c.Job.Equals("Child", StringComparison.OrdinalIgnoreCase))
        {
            if (c.Age < 7)
            {
                int p1 = Math.Min(100, (int)Math.Round((c.Age / 7.0) * 100));
                int p2 = Math.Min(100, (int)Math.Round((c.Health / 30.0) * 100));
                int p3 = Math.Min(100, (int)Math.Round((c.Sanity / 30.0) * 100));
                int avg = (p1 + p2 + p3) / 3;

                return new CareerMilestoneDto(
                    Category: "CHILDHOOD SURVIVAL",
                    TitleVi: "Sinh tồn thơ ấu tại The City",
                    TitleEn: "Childhood Survival in The City",
                    ProgressPct: avg,
                    Requirements:
                    [
                        new("Đạt tuổi 7", "Reach Age 7", c.Age, 7, c.Age >= 7),
                        new("Sinh lực an toàn (HP)", "Safe Health (HP)", c.Health, 30, c.Health >= 30),
                        new("Tỉnh táo an toàn (SP)", "Safe Sanity (SP)", c.Sanity, 30, c.Sanity >= 30)
                    ],
                    TipVi: "Bảo toàn mạng sống và giữ tâm trí ổn định trước những nguy hiểm đầu đời.",
                    TipEn: "Stay alive and keep your mind sound amidst early city perils."
                );
            }

            if (c.Age < 14)
            {
                int p1 = Math.Min(100, (int)Math.Round((c.Age / 14.0) * 100));
                int p2 = Math.Min(100, (int)Math.Round((c.Network / 15.0) * 100));
                int p3 = c.ActiveNpcsCount >= 1 ? 100 : 0;
                int avg = (p1 + p2 + p3) / 3;

                return new CareerMilestoneDto(
                    Category: "STREET APPRENTICESHIP",
                    TitleVi: "Xây dựng quan hệ & Nền tảng đường phố",
                    TitleEn: "Street Aptitude & Bonds",
                    ProgressPct: avg,
                    Requirements:
                    [
                        new("Đạt tuổi 14", "Reach Age 14", c.Age, 14, c.Age >= 14),
                        new("Mối quan hệ (Network)", "Network", c.Network, 15, c.Network >= 15),
                        new("Bạn bè / Người thân đồng hành", "Companions", c.ActiveNpcsCount, 1, c.ActiveNpcsCount >= 1)
                    ],
                    TipVi: "Kết thân với bạn bè hoặc người thầy, học hỏi quy tắc sinh tồn ở Backstreets hoặc Nest.",
                    TipEn: "Befriend companions or mentors, learning the survival codes of the City."
                );
            }

            int pAge = Math.Min(100, (int)Math.Round((c.Age / 18.0) * 100));
            int pStat = Math.Min(100, Math.Max((c.Merit * 100) / 8, Math.Max((c.Wealth * 100) / 12, (c.Rep * 100) / 10)));
            int prepProgress = (int)Math.Round(pAge * 0.6 + pStat * 0.4);

            return new CareerMilestoneDto(
                Category: "CAREER CROSSROADS (AGE 18)",
                TitleVi: "Chuẩn bị bước ngoặt cuộc đời (Tuổi 18)",
                TitleEn: "Preparation for Age 18 Crossroads",
                ProgressPct: prepProgress,
                Requirements:
                [
                    new("Đạt tuổi trưởng thành (18)", "Reach Adulthood (18)", c.Age, 18, c.Age >= 18),
                    new("Tích lũy nền tảng (Merit, Ahn hoặc Rep)", "Merit, Ahn or Rep", Math.Max(c.Merit, Math.Max(c.Wealth, c.Rep)), 10, Math.Max(c.Merit, Math.Max(c.Wealth, c.Rep)) >= 10)
                ],
                TipVi: "Tại tuổi 18, bạn sẽ quyết định con đường: Hana Fixer, Syndicate, Wing Feather hay Workshop.",
                TipEn: "At age 18, you will choose your path: Hana Fixer, Syndicate, Wing Feather, or Workshop."
            );
        }

        // 2. Fixer Career
        if (c.Job.Equals("Fixer", StringComparison.OrdinalIgnoreCase))
        {
            if (c.FixerGrade == 0 || flags.Contains("ColorFixer"))
            {
                int p1 = Math.Min(100, (c.Merit * 100) / 250);
                int p2 = Math.Min(100, (c.Rep * 100) / 90);
                int progress = (p1 + p2) / 2;

                return new CareerMilestoneDto(
                    Category: "COLOR FIXER ASCENSION",
                    TitleVi: "Huyền thoại The City (City Legend)",
                    TitleEn: "Sovereign Legend of The City",
                    ProgressPct: progress,
                    Requirements:
                    [
                        new("Chiến công tối thượng (Merit)", "Merit", c.Merit, 250, c.Merit >= 250),
                        new("Danh tiếng vang dội (Rep)", "Reputation", c.Rep, 90, c.Rep >= 90)
                    ],
                    TipVi: "Bạn là một Color. Tên tuổi bạn sánh ngang Red Mist hay Black Silence, ghi dấu vào lịch sử.",
                    TipEn: "You are a Color. Your name stands alongside the Red Mist and Black Silence."
                );
            }

            if (c.FixerGrade == 1)
            {
                bool defeatedCalamity = flags.Contains("StarOfCityOvercome") || flags.Contains("ColorFixer");

                int p1 = Math.Min(100, (c.Merit * 100) / ColorMerit);
                int p2 = Math.Min(100, (c.Rep * 100) / ColorRep);
                int progress = (p1 + p2) / 2;
                bool canPromote = c.Merit >= ColorMerit && c.Rep >= ColorRep;

                return new CareerMilestoneDto(
                    Category: "STAR OF THE CITY ORDEAL",
                    TitleVi: "Đại Khảo Thí Phong Color (Hana Council)",
                    TitleEn: "Hana Star of the City: Color Investiture",
                    ProgressPct: progress,
                    Requirements:
                    [
                        new($"Chiến công (Merit >= {ColorMerit})", $"Merit (>= {ColorMerit})", c.Merit, ColorMerit, c.Merit >= ColorMerit),
                        new($"Danh tiếng (Rep >= {ColorRep})", $"Reputation (>= {ColorRep})", c.Rep, ColorRep, c.Rep >= ColorRep),
                        new("Vượt qua mối họa Star of the City", "Overcome Star of the City Calamity", defeatedCalamity ? 1 : 0, 1, defeatedCalamity)
                    ],
                    TipVi: "Đủ Merit và Rep thì Hana Association triệu tập đại khảo thí phong Color. E.G.O không phải điều kiện bắt buộc.",
                    TipEn: "With enough Merit and Rep, Hana Association convenes the Color Investiture trial. E.G.O is not a prerequisite.",
                    CanPromote: canPromote,
                    NextRankTitleVi: "Color Fixer (Huyền Thoại The City)",
                    NextRankTitleEn: "Color Fixer (City Legend)"
                );
            }

            // Grade 9 -> 2
            int targetGrade = c.FixerGrade - 1;
            var threshold = FixerThresholds.FirstOrDefault(t => t.Grade == targetGrade);
            if (threshold.Grade == 0) threshold = FixerThresholds[0];

            int pM = Math.Min(100, (c.Merit * 100) / threshold.Merit);
            int pR = Math.Min(100, (c.Rep * 100) / threshold.Rep);
            int gradeProgress = (pM + pR) / 2;
            bool canUp = c.Merit >= threshold.Merit && c.Rep >= threshold.Rep;

            return new CareerMilestoneDto(
                Category: "HANA EVALUATION",
                TitleVi: $"Thăng cấp: {threshold.TitleVi}",
                TitleEn: $"Promotion: {threshold.TitleEn}",
                ProgressPct: gradeProgress,
                Requirements:
                [
                    new("Chiến công (Merit)", "Merit", c.Merit, threshold.Merit, c.Merit >= threshold.Merit),
                    new("Danh tiếng (Rep)", "Reputation", c.Rep, threshold.Rep, c.Rep >= threshold.Rep)
                ],
                TipVi: "Nhận hợp đồng Fixer, giải quyết ủy thác từ Association hoặc can thiệp bạo lực để tích lũy Merit và Rep.",
                TipEn: "Accept Fixer contracts, resolve Association requests, or survive clashes to earn Merit and Rep.",
                CanPromote: canUp,
                NextRankTitleVi: threshold.TitleVi,
                NextRankTitleEn: threshold.TitleEn
            );
        }

        // 3. Syndicate Career
        if (c.Job.Equals("Syndicate", StringComparison.OrdinalIgnoreCase))
        {
            string finger = !string.IsNullOrWhiteSpace(c.Finger) ? c.Finger : "Thumb";
            var ladder = FingerLadders.GetValueOrDefault(finger, FingerLadders["Thumb"]);
            int curRank = Math.Clamp(c.FingerRank, 0, ladder.Length - 1);

            if (curRank >= ladder.Length - 1)
            {
                return new CareerMilestoneDto(
                    Category: $"THE {finger.ToUpperInvariant()} SOVEREIGNTY",
                    TitleVi: $"Đỉnh cao quyền lực: {ladder[curRank]}",
                    TitleEn: $"Peak Authority: {ladder[curRank]}",
                    ProgressPct: 100,
                    Requirements:
                    [
                        new("Chiến công (Merit)", "Merit", c.Merit, (curRank + 1) * 26, true)
                    ],
                    TipVi: "Bạn đã là người đứng đầu một nhánh của Ngón. Mệnh lệnh của bạn là luật trong hẻm.",
                    TipEn: "You hold supreme authority within your Finger branch. Your word is alley law."
                );
            }

            int nextRank = curRank + 1;
            string nextTitle = ladder[nextRank];
            int reqMerit = nextRank == 3 ? 115 : nextRank * 26;
            int reqRep = nextRank == 3 ? 65 : nextRank * 16;
            int pM = Math.Min(100, (c.Merit * 100) / reqMerit);
            int pR = Math.Min(100, (c.Rep * 100) / reqRep);
            int progress = (pM + pR) / 2;
            bool canUp = c.Merit >= reqMerit && c.Rep >= reqRep;

            return new CareerMilestoneDto(
                Category: $"THE {finger.ToUpperInvariant()} TRIAL",
                TitleVi: $"Thăng bậc: {nextTitle}",
                TitleEn: $"Syndicate Rank: {nextTitle}",
                ProgressPct: progress,
                Requirements:
                [
                    new("Công trạng với Ngón (Merit)", "Syndicate Merit", c.Merit, reqMerit, c.Merit >= reqMerit),
                    new("Uy danh giang hồ (Rep)", "Reputation", c.Rep, reqRep, c.Rep >= reqRep)
                ],
                TipVi: "Thực thi mệnh lệnh của Ngón, thu hồi nợ máu và chứng minh lòng trung thành.",
                TipEn: "Execute Finger orders, claim vengeance debts, and prove unquestioned loyalty.",
                CanPromote: canUp,
                NextRankTitleVi: nextTitle,
                NextRankTitleEn: nextTitle
            );
        }

        // 4. Wing Employee Career
        if (c.Job.Equals("Wing Employee", StringComparison.OrdinalIgnoreCase))
        {
            int curRank = Math.Clamp(c.WingRank, 0, WingRanks.Length - 1);
            if (curRank >= WingRanks.Length - 1)
            {
                return new CareerMilestoneDto(
                    Category: "WING EXECUTIVE",
                    TitleVi: "Giám đốc cấp cao (Wing Executive)",
                    TitleEn: "Senior Wing Executive",
                    ProgressPct: 100,
                    Requirements: [],
                    TipVi: "Bạn ngồi trong ban điều hành Wing, nắm giữ bí mật Singularity.",
                    TipEn: "You sit on the executive board, guarding the secrets of the Singularity."
                );
            }

            var nextDef = WingRanks[curRank + 1];
            int p1 = Math.Min(100, (c.Merit * 100) / nextDef.Merit);
            int p2 = Math.Min(100, (c.Wealth * 100) / nextDef.Wealth);
            int p3 = Math.Min(100, (c.Network * 100) / nextDef.Network);
            int progress = (p1 + p2 + p3) / 3;
            bool canUp = c.Merit >= nextDef.Merit && c.Wealth >= nextDef.Wealth && c.Network >= nextDef.Network;

            return new CareerMilestoneDto(
                Category: "WING ADVANCEMENT",
                TitleVi: $"Thăng chức: {nextDef.TitleVi}",
                TitleEn: $"Promotion: {nextDef.TitleEn}",
                ProgressPct: progress,
                Requirements:
                [
                    new("Hiệu suất công việc (Merit)", "Merit", c.Merit, nextDef.Merit, c.Merit >= nextDef.Merit),
                    new("Cổ phần & Ahn (Wealth)", "Wealth (Ahn)", c.Wealth, nextDef.Wealth, c.Wealth >= nextDef.Wealth),
                    new("Mối quan hệ nội bộ (Network)", "Network", c.Network, nextDef.Network, c.Network >= nextDef.Network)
                ],
                TipVi: "Hoàn thành các dự án nghiên cứu của Wing, giữ quan hệ với ban quản trị và tích lũy Ahn.",
                TipEn: "Deliver Wing research quotas, cultivate corporate ties, and amass Ahn.",
                CanPromote: canUp,
                NextRankTitleVi: nextDef.TitleVi,
                NextRankTitleEn: nextDef.TitleEn
            );
        }

        if (c.Job.Equals("Workshop Craftsman", StringComparison.OrdinalIgnoreCase))
        {
            return new CareerMilestoneDto(
                Category: "WORKSHOP",
                TitleVi: "M?t ng?y ? x??ng",
                TitleEn: "A day at the Workshop",
                ProgressPct: 0,
                Requirements: [],
                TipVi: "Nh?n ??n, l?m ra m?n ??, v? gi? x??ng m? c?a.",
                TipEn: "Take commissions, finish the work, and keep the Workshop open."
            );
        }

        // Fallback
        return new CareerMilestoneDto(
            Category: "SURVIVAL",
            TitleVi: "Sống sót và khẳng định vị thế",
            TitleEn: "Survival & Renown",
            ProgressPct: Math.Min(100, c.Merit * 2),
            Requirements:
            [
                new("Chiến công (Merit)", "Merit", c.Merit, 50, c.Merit >= 50)
            ],
            TipVi: "Gia tăng tài nguyên và tạo dựng danh tiếng trong khu vực.",
            TipEn: "Build your wealth and cement your reputation across the District."
        );
    }

    // string.GetHashCode is randomized per process, so a seed would plan a different year after a restart
    private static int StableHash(string text)
    {
        uint hash = 2166136261;
        foreach (char ch in text)
        {
            hash = (hash ^ ch) * 16777619;
        }
        return (int)(hash & 0x7FFFFFFF);
    }

    /// <summary>
    /// Plans 4-season dramatic timeline with server-side drama tension & causal threads.
    /// </summary>
    public PlanYearResponseDto PlanYear(PlanYearRequestDto req)
    {
        var sw = Stopwatch.GetTimestamp();
        var c = req.Char;
        var flags = c.Flags ?? [];
        var seen = c.SeenEvents ?? [];

        // Simple deterministic PRNG seeded with input seed + age
        int seedVal = string.IsNullOrWhiteSpace(req.Seed)
            ? (int)(DateTime.UtcNow.Ticks & 0x7FFFFFFF)
            : StableHash(req.Seed) ^ (c.Age * 397);

        var random = new Random(seedVal);

        // Calculate Tension
        double rawTension = 15.0
            + Math.Min(30.0, c.Heat * 0.45)
            + Math.Min(25.0, c.Taboo * 9.0)
            + Math.Max(0.0, (55 - c.Sanity) * 0.6)
            + Math.Max(0.0, (50 - c.Health) * 0.45)
            + Math.Min(18.0, c.Resonance * 0.25);

        int tension = (int)Math.Clamp(Math.Round(rawTension), 5, 100);

        string dramaPhase = "INCUBATION";
        if (c.YearsSinceLastMajor <= 1 && tension < 78) dramaPhase = "AFTERMATH";
        else if (tension >= 68 || c.Sanity <= 18 || c.Taboo >= 3) dramaPhase = "CLIMAX";
        else if (tension >= 38 || c.Age >= 17) dramaPhase = "RISING_TENSION";

        var scheduledKey = new List<PlanMomentDto>(4);

        // 1. Causal consequences due this year
        if (c.PendingThreads is { Count: > 0 })
        {
            foreach (var th in c.PendingThreads)
            {
                if (th.Fulfilled || c.Age < th.TriggerAge) continue;

                scheduledKey.Add(new PlanMomentDto(
                    T: 0,
                    Kind: th.Kind.Equals("minor", StringComparison.OrdinalIgnoreCase) ? "minor" : "major",
                    Id: th.EventId,
                    ForcedEventId: th.EventId,
                    Thread: th.Id,
                    IsCausal: true,
                    TitleVi: !string.IsNullOrWhiteSpace(th.ReasonVi) ? th.ReasonVi : "Quả báo định mệnh",
                    TitleEn: !string.IsNullOrWhiteSpace(th.ReasonEn) ? th.ReasonEn : "Causal Consequence"
                ));
                break; // One major causal thread per year keeps pacing crisp
            }
        }

        // 2. Check major event eligibility
        bool majorDue = false;
        string majorId = "";
        string majorTitleVi = "";
        string majorTitleEn = "";

        if ((c.Age == 18 || (c.Age > 18 && c.Job.Equals("Child", StringComparison.OrdinalIgnoreCase))) && !seen.Contains("ad_career_crossroad_18"))
        {
            majorDue = true;
            majorId = "ad_career_crossroad_18";
            majorTitleVi = "Bước Ngoặt The City (Tuổi 18)";
            majorTitleEn = "Age 18 Career Crossroads";
        }
        else if (c.Taboo >= 3)
        {
            majorDue = true;
            majorId = "head_taboo_claw_trial";
            majorTitleVi = "Móng Vuốt Phạt Tội (A Corp Claw)";
            majorTitleEn = "Head Taboo Enforcement Claw";
        }
        else if (c.Age >= 18 && ((c.Sanity <= 5 && random.NextDouble() < 0.12) || (c.Resonance >= 90 && random.NextDouble() < 0.15)) && !seen.Contains("ego_carmen_crossroad") && !flags.Contains("EGOAwakened") && !flags.Contains("Distorted"))
        {
            majorDue = true;
            majorId = "ego_carmen_crossroad";
            majorTitleVi = "Tiếng Gọi Giữa Vầng Thái Dương (Carmen's Voice)";
            majorTitleEn = "Voices in the Blinding Sun (Carmen)";
        }
        else if (c.Job.Equals("Fixer", StringComparison.OrdinalIgnoreCase) && c.FixerGrade == 1 && c.Merit >= ColorMerit && c.Rep >= ColorRep && !flags.Contains("ColorFixer") && !seen.Contains("hana_color_ascension_trial"))
        {
            majorDue = true;
            majorId = "hana_color_ascension_trial";
            majorTitleVi = "Đại Khảo Thí Phong Color (Hana Council)";
            majorTitleEn = "Hana Color Investiture Trial";
        }
        else if (c.Job.Equals("Fixer", StringComparison.OrdinalIgnoreCase) && !flags.Contains("Distorted") &&
            FixerThresholds.Any(t => t.Grade == c.FixerGrade - 1 && c.Merit >= t.Merit && c.Rep >= t.Rep))
        {
            majorDue = true;
        }
        else if (c.Job.Equals("Syndicate", StringComparison.OrdinalIgnoreCase) && !flags.Contains("Distorted"))
        {
            string finger = string.IsNullOrEmpty(c.Finger) ? "Thumb" : c.Finger;
            if (c.FingerRank == 0 && c.Merit >= 26 && c.Rep >= 16)
            {
                majorDue = true;
                majorId = finger.ToLowerInvariant() switch
                {
                    "thumb" => "syn_thumb_promo_capo",
                    "index" => "syn_index_promo_messenger",
                    "middle" => "syn_middle_promo_big_sibling",
                    "ring" => "syn_ring_promo_docent",
                    _ => "syn_pinky_promo_blade"
                };
                majorTitleVi = $"Khảo thí thăng bậc The {finger} (Rank 1)";
                majorTitleEn = $"The {finger} Promotion Trial (Rank 1)";
            }
            else if (c.FingerRank == 1 && c.Merit >= 52 && c.Rep >= 32)
            {
                majorDue = true;
                majorId = finger.ToLowerInvariant() switch
                {
                    "thumb" => "syn_thumb_promo_sottocapo",
                    "index" => "syn_index_promo_proxy",
                    "middle" => "syn_middle_promo_great_elder",
                    "ring" => "syn_ring_promo_maestro",
                    _ => "syn_pinky_star_blade_pinnacle"
                };
                majorTitleVi = $"Khảo thí thăng bậc The {finger} (Rank 2)";
                majorTitleEn = $"The {finger} Promotion Trial (Rank 2)";
            }
            else if (c.FingerRank == 2 && c.Merit >= 115 && c.Rep >= 65)
            {
                majorDue = true;
                majorId = finger.ToLowerInvariant() switch
                {
                    "thumb" => "syn_thumb_underboss_purge",
                    "index" => "syn_index_weaver_prescript",
                    "middle" => "syn_middle_great_brother_vendetta",
                    "ring" => "syn_ring_curator_monument",
                    _ => "syn_pinky_promo_sovereign"
                };
                majorTitleVi = $"Đại Lễ Tuyên Thệ Đỉnh Cao The {finger} (Rank 3)";
                majorTitleEn = $"The {finger} Pinnacle Sovereign Trial (Rank 3)";
            }
        }
        else if (c.Job.Equals("Wing Employee", StringComparison.OrdinalIgnoreCase) && !flags.Contains("Distorted"))
        {
            if (c.WingRank == 0 && c.Merit >= 25 && c.Wealth >= 18 && c.Network >= 14 && !seen.Contains("wing_promo_feather_r1"))
            {
                majorDue = true;
                majorId = "wing_promo_feather_r1";
                majorTitleVi = "Bổ Nhiệm Feather Chính Thức (Nest Feather)";
                majorTitleEn = "Official Feather Commission";
            }
            else if (c.WingRank == 1 && c.Merit >= 65 && c.Wealth >= 45 && c.Network >= 32 && !seen.Contains("wing_promo_specialist_r2"))
            {
                majorDue = true;
                majorId = "wing_promo_specialist_r2";
                majorTitleVi = "Trưởng Phòng Ban Singularity (Section Chief)";
                majorTitleEn = "Section Chief / Singularity Specialist";
            }
            else if (c.WingRank == 2 && c.Merit >= 125 && c.Wealth >= 85 && c.Network >= 60 && !seen.Contains("wing_singularity_classified_audit"))
            {
                majorDue = true;
                majorId = "wing_singularity_classified_audit";
                majorTitleVi = "Thanh Tra Dự Án Tối Mật Singularity";
                majorTitleEn = "Classified Singularity Audit";
            }
        }
        else if (c.Age <= 4)
        {
            // No major events in early childhood (matches the client's majorIsDue)
        }
        else if (c.Age < 12)
        {
            // The gap counts from birth, so the adult rule below would put every first major
            // event at exactly age 5. Spread it over 5-9, same as the client.
            majorDue = c.YearsSinceLastMajor >= 9 ||
                (c.YearsSinceLastMajor >= 3 && random.NextDouble() < (c.Age <= 6 ? 0.3 : 0.4));
        }
        else if (c.YearsSinceLastMajor >= 5 || (c.YearsSinceLastMajor >= 2 && random.NextDouble() < 0.35))
        {
            majorDue = true;
        }

        if (majorDue && !scheduledKey.Any(k => k.Kind == "major"))
        {
            scheduledKey.Add(new PlanMomentDto(
                T: 0,
                Kind: "major",
                Id: majorId,
                ForcedEventId: majorId,
                TitleVi: majorTitleVi,
                TitleEn: majorTitleEn
            ));
        }

        // 3. Fixer Tactical Contract
        if (c.Job.Equals("Fixer", StringComparison.OrdinalIgnoreCase) && c.Age >= 19 && random.NextDouble() < FixerContractOfferChance(c) && !scheduledKey.Any(k => k.Kind == "contract"))
        {
            scheduledKey.Add(new PlanMomentDto(
                T: 0,
                Kind: "contract",
                TitleVi: "Ủy Thác Chiến Đấu Fixer",
                TitleEn: "Fixer Combat Commission"
            ));
        }

        // 4. Distribute across 4 Seasonal slots
        var slots = new PlanMomentDto?[4];

        foreach (var it in scheduledKey)
        {
            if (it.Kind == "major")
            {
                int s = slots[3] is null ? 3 : (slots[2] is null ? 2 : (slots[1] is null ? 1 : 0));
                slots[s] = it;
            }
            else if (it.Kind == "contract")
            {
                int s = slots[0] is null ? 0 : (slots[1] is null ? 1 : (slots[2] is null ? 2 : 3));
                slots[s] = it;
            }
            else
            {
                int s = Array.IndexOf(slots, null);
                if (s >= 0) slots[s] = it;
            }
        }

        // Fill remaining slots with minors and dailies
        if (c.Age <= 4)
        {
            // Early childhood (age 0-4): exactly 1 passive event per year to prevent repetitive spam
            int targetSeason = (c.Age + 1) % 4;
            if (slots[targetSeason] is null && !slots.Any(s => s is not null))
            {
                slots[targetSeason] = new PlanMomentDto(
                    T: 0,
                    Kind: "daily",
                    TitleVi: "Nhịp sống thơ ấu",
                    TitleEn: "Childhood Living Echo"
                );
            }
        }
        else
        {
            for (int s = 0; s < 4; s++)
            {
                if (slots[s] is null)
                {
                    bool isMinor = (s == 1 || s == 2) && random.NextDouble() < 0.55 && c.Age >= 4;
                    slots[s] = new PlanMomentDto(
                        T: 0,
                        Kind: isMinor ? "minor" : "daily",
                        TitleVi: isMinor ? "Lựa chọn thời khắc" : "Nhịp sống The City",
                        TitleEn: isMinor ? "Crucial Moment" : "City Living Echo"
                    );
                }
            }
        }

        // Build final chronological list with precise seasonal time coordinates
        var resultMoments = new List<PlanMomentDto>(4);
        for (int s = 0; s < 4; s++)
        {
            var item = slots[s]!;
            var band = SeasonBands[s];
            double t = Math.Round(band.MinT + random.NextDouble() * (band.MaxT - band.MinT), 3);

            resultMoments.Add(item with
            {
                T = t,
                SeasonIdx = s,
                Season = band.Season
            });
        }

        resultMoments.Sort((a, b) => a.T.CompareTo(b.T));

        var elapsedMs = Stopwatch.GetElapsedTime(sw).TotalMilliseconds;
        return new PlanYearResponseDto(
            Moments: resultMoments,
            DramaPhase: dramaPhase,
            TensionScore: tension,
            ExecutionTimeMs: Math.Round(elapsedMs, 4)
        );
    }

    /// <summary>
    /// Resolves difficult high-stakes trials: E.G.O Awakening vs Distortion, Hana Color Investiture.
    /// </summary>
    public CrucibleTrialResponseDto ResolveCrucible(CrucibleTrialRequestDto req)
    {
        var c = req.Char;
        var flags = c.Flags ?? [];

        if (req.TrialType.Equals("EGO_AWAKENING", StringComparison.OrdinalIgnoreCase))
        {
            bool chooseFirm = req.ChoiceId.Contains("firm", StringComparison.OrdinalIgnoreCase) || req.ChoiceId.Contains("resist", StringComparison.OrdinalIgnoreCase);
            bool chooseSuccumb = req.ChoiceId.Contains("succumb", StringComparison.OrdinalIgnoreCase) || req.ChoiceId.Contains("yield", StringComparison.OrdinalIgnoreCase);

            if (req.Sanity >= 25 && req.Resonance >= 35 && chooseFirm)
            {
                return new CrucibleTrialResponseDto(
                    Success: true,
                    OutcomeType: "TRUE_EGO",
                    TitleVi: "Thức Tỉnh Bản Ngã (True E.G.O Manifested)",
                    TitleEn: "True E.G.O Manifestation",
                    DescriptionVi: "Tâm trí bạn đứng vững trước tiếng thì thầm của Carmen. Vỏ bọc ánh sáng ngưng tụ thành vũ khí và giáp trụ phản ánh bản chất linh hồn.",
                    DescriptionEn: "Your mind held unyielding against Carmen's whispers. The light crystallized into armament mirroring your soul's absolute conviction.",
                    FlagsToAdd: ["EGOAwakened"],
                    FlagsToRemove: ["IncompleteEGO", "Distorted"],
                    MeritDelta: 35,
                    SanityDelta: 25,
                    HealthDelta: 10,
                    RepDelta: 20,
                    EpitaphVi: "Kẻ thức tỉnh E.G.O thuần khiết giữa The City",
                    EpitaphEn: "One who manifested pure E.G.O amidst the City's endless night"
                );
            }

            if (req.Sanity <= 12 || chooseSuccumb)
            {
                return new CrucibleTrialResponseDto(
                    Success: false,
                    OutcomeType: "DISTORTION",
                    TitleVi: "Biến Dị Tâm Thức (Distortion Born)",
                    TitleEn: "Distortion Transformation",
                    DescriptionVi: "Bạn buông xuôi trước tiếng thì thầm. Bản ngã tan chảy và định hình lại thành một Dị Thể méo mó gieo rắc kinh hoàng.",
                    DescriptionEn: "You surrendered to the whisper. Your ego liquefied and reformed into a grotesque Distortion sowing terror.",
                    FlagsToAdd: ["Distorted"],
                    FlagsToRemove: ["EGOAwakened", "IncompleteEGO"],
                    MeritDelta: 0,
                    SanityDelta: -40,
                    HealthDelta: -20,
                    RepDelta: -30,
                    EpitaphVi: "Một Dị Thể sinh ra từ nỗi tuyệt vọng tột cùng",
                    EpitaphEn: "A Distortion spawned from the depths of absolute despair"
                );
            }

            // Incomplete E.G.O
            return new CrucibleTrialResponseDto(
                Success: true,
                OutcomeType: "INCOMPLETE_EGO",
                TitleVi: "Bản Ngã Bán Phần (Incomplete E.G.O)",
                TitleEn: "Incomplete E.G.O Attunement",
                DescriptionVi: "Ngọn lửa bản ngã bùng cháy nhưng chưa hoàn toàn định hình. Bạn nắm giữ sức mạnh to lớn nhưng luôn cận kề ranh giới biến dị.",
                DescriptionEn: "The flame of your ego ignited partially. Tremendous power is yours, yet you teeter on the precipice of distortion.",
                FlagsToAdd: ["IncompleteEGO"],
                FlagsToRemove: [],
                MeritDelta: 18,
                SanityDelta: 5,
                HealthDelta: 0,
                RepDelta: 12,
                EpitaphVi: "Chiến binh nắm giữ sức mạnh bản ngã bất toàn",
                EpitaphEn: "A warrior wielding the fractured flame of an incomplete E.G.O"
            );
        }

        if (req.TrialType.Equals("COLOR_FIXER", StringComparison.OrdinalIgnoreCase))
        {
            bool hasPrereqs = c.FixerGrade <= 1 && c.Merit >= ColorMerit && c.Rep >= ColorRep;

            if (hasPrereqs)
            {
                // Generate majestic Color Fixer Title based on affinity
                string colorTitleVi = "Huyết Nhẫn The City (The Crimson Brand)";
                string colorTitleEn = "The Crimson Brand";

                if (c.Sanity >= 60 && c.Resonance >= 50)
                {
                    colorTitleVi = "Thanh Lưu Vô Tận (The Azure Stream)";
                    colorTitleEn = "The Azure Stream";
                }
                else if (c.Network >= 60 || c.Wealth >= 60)
                {
                    colorTitleVi = "Kim Chùy Trọng Phán (The Golden Gavel)";
                    colorTitleEn = "The Golden Gavel";
                }
                else if (flags.Contains("EGOAwakened"))
                {
                    colorTitleVi = "Hắc Dạ Đoạt Mệnh (The Onyx Veil)";
                    colorTitleEn = "The Onyx Veil";
                }

                return new CrucibleTrialResponseDto(
                    Success: true,
                    OutcomeType: "COLOR_ASCENSION",
                    TitleVi: $"Phong Sắc Color Fixer: {colorTitleVi}",
                    TitleEn: $"Color Fixer Investiture: {colorTitleEn}",
                    DescriptionVi: "Hana Association Đại Hội Đồng nhất trí phê chuẩn phong sắc. Tên của bạn được khắc lên Bia Ký Vĩnh Cửu của The City.",
                    DescriptionEn: "The Hana Grand Council unanimously ratified your investiture. Your name is etched into the Eternal Stele of the City.",
                    FlagsToAdd: ["ColorFixer", "StarOfCityOvercome"],
                    FlagsToRemove: [],
                    MeritDelta: 60,
                    SanityDelta: 20,
                    HealthDelta: 15,
                    RepDelta: 30,
                    EpitaphVi: $"Vị Color Fixer huyền thoại [{colorTitleVi}]",
                    EpitaphEn: $"The legendary Color Fixer [{colorTitleEn}]"
                );
            }

            return new CrucibleTrialResponseDto(
                Success: false,
                OutcomeType: "REJECTION",
                TitleVi: "Khảo Thí Chưa Thành (Hana Council Withheld)",
                TitleEn: "Trial Deferred",
                DescriptionVi: "Hana Association nhận định bạn chưa hội đủ uy danh hoặc bản ngã để đứng vào hàng ngũ Color Fixer.",
                DescriptionEn: "The Hana Council decreed your renown or spiritual resonance insufficient to join the pantheon of Colors.",
                FlagsToAdd: [],
                FlagsToRemove: [],
                MeritDelta: 5,
                SanityDelta: -10,
                HealthDelta: 0,
                RepDelta: 0,
                EpitaphVi: "Fixer gục ngã trước ngưỡng cửa phong Color",
                EpitaphEn: "A Fixer who fell short before the threshold of Color investiture"
            );
        }

        return new CrucibleTrialResponseDto(
            Success: false,
            OutcomeType: "UNKNOWN",
            TitleVi: "Khảo thí không xác định",
            TitleEn: "Unknown Trial",
            DescriptionVi: "Không có quy chuẩn khảo thí phù hợp.",
            DescriptionEn: "No valid trial criteria found.",
            FlagsToAdd: [],
            FlagsToRemove: [],
            MeritDelta: 0,
            SanityDelta: 0,
            HealthDelta: 0,
            RepDelta: 0,
            EpitaphVi: "",
            EpitaphEn: ""
        );
    }
}
