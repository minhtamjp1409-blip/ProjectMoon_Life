using System.IO.Compression;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.ResponseCompression;
using ProjectMoon.Api.Models;
using ProjectMoon.Api.Services;

var builder = WebApplication.CreateSlimBuilder(args);

var defaultUrl = Environment.GetEnvironmentVariable("PORT") is { Length: > 0 } port
    ? $"http://0.0.0.0:{port}"
    : "http://localhost:5080";
builder.WebHost.UseUrls(builder.Configuration["Urls"] ?? defaultUrl);
// A saved life with a long log reaches a few hundred KB; anything far bigger is not ours
builder.WebHost.ConfigureKestrel(o => o.Limits.MaxRequestBodySize = 4 * 1024 * 1024);

// Source-generated JSON for every request and response type
builder.Services.ConfigureHttpJsonOptions(o => o.SerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonContext.Default));

builder.Services.AddResponseCompression(o =>
{
    o.Providers.Add<BrotliCompressionProvider>();
    o.Providers.Add<GzipCompressionProvider>();
});
builder.Services.Configure<BrotliCompressionProviderOptions>(o => o.Level = CompressionLevel.Fastest);

// Public game API: allow calls from any frontend origin (local, LAN, Vercel, mobile webviews)
builder.Services.AddCors(o => o.AddPolicy("Frontend", p => p
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()));

builder.Services.AddSingleton<PlayerArchiveRegistry>();
builder.Services.AddHostedService<ArchiveFlushService>();
builder.Services.AddSingleton<WeaverAiEngineService>();
builder.Services.AddSingleton<DirectorEngineService>();

var app = builder.Build();

app.UseResponseCompression();
app.UseCors("Frontend");

var slotPattern = new Regex("^[a-z0-9_-]{1,32}$", RegexOptions.Compiled);
app.Use(async (context, next) =>
{
    var path = context.Request.Path;
    if (path.StartsWithSegments("/api/archive") || path.StartsWithSegments("/api/state") || path.StartsWithSegments("/api/telemetry"))
    {
        var store = context.RequestServices.GetRequiredService<PlayerArchiveRegistry>().ForRequest(context);
        if (store is null)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return;
        }
        context.Items[typeof(ArchiveStoreService)] = store;
    }
    await next(context);
});

ArchiveStoreService PlayerStore(HttpContext context) => (ArchiveStoreService)context.Items[typeof(ArchiveStoreService)]!;

var api = app.MapGroup("/api");

api.MapGet("/health", (PlayerArchiveRegistry registry) => Results.Ok(new HealthDto(
    "ONLINE",
    "ProjectMoon.Api (.NET 8)",
    Math.Round(GC.GetTotalMemory(false) / 1048576.0, 2),
    registry.PendingWrites,
    DateTime.UtcNow)));

// Archive: past lives, the codex, events written in the Loom
api.MapGet("/archive", (HttpContext context) => Results.Ok(PlayerStore(context).GetSnapshot()));
api.MapPost("/archive/memorial", (BloodlineMemorialDto memorial, HttpContext context) => Results.Ok(PlayerStore(context).AddMemorial(memorial)));
api.MapDelete("/archive/memorial", (string seed, int age, HttpContext context) => Results.Ok(PlayerStore(context).DeleteMemorial(seed, age)));
api.MapDelete("/archive/memorials", (HttpContext context) => Results.Ok(PlayerStore(context).ClearMemorials()));
api.MapPost("/archive/codex", (CodexSyncRequest req, HttpContext context) => Results.Ok(new CodexResponse(PlayerStore(context).SyncCodex(req.Keys))));
api.MapPost("/archive/custom-event", (CustomEventDto customEvent, HttpContext context) =>
    string.IsNullOrWhiteSpace(customEvent.Id) || string.IsNullOrWhiteSpace(customEvent.Vi)
        ? Results.BadRequest()
        : Results.Ok(new CustomEventsResponse(PlayerStore(context).AddCustomEvent(customEvent))));
api.MapGet("/archive/hall-of-fame", (int? take, HttpContext context) => Results.Ok(PlayerStore(context).GetHallOfFame(take ?? 10)));
api.MapGet("/telemetry", (HttpContext context) => Results.Ok(PlayerStore(context).GetTelemetry()));

// The life in progress, so a player can leave mid-run and come back
api.MapGet("/state/{slot}", (string slot, HttpContext context) =>
    !slotPattern.IsMatch(slot) ? Results.BadRequest() : PlayerStore(context).GetRun(slot) is { } run ? Results.Ok(run) : Results.NotFound());
api.MapPut("/state/{slot}", (string slot, RunStateDto run, HttpContext context) =>
{
    if (!slotPattern.IsMatch(slot) || run.Char.ValueKind != JsonValueKind.Object) return Results.BadRequest();
    PlayerStore(context).SaveRun(slot, run);
    return Results.NoContent();
});
api.MapDelete("/state/{slot}", (string slot, HttpContext context) =>
    !slotPattern.IsMatch(slot) ? Results.BadRequest() : PlayerStore(context).DeleteRun(slot) ? Results.NoContent() : Results.NotFound());

api.MapPost("/weaver/evaluate", (WeaverEvaluationRequest req, WeaverAiEngineService weaver) => Results.Ok(weaver.Evaluate(req)));

// Director Engine: offloaded server-side year planning, milestone checks & crucible trials
api.MapPost("/director/plan-year", (PlanYearRequestDto req, DirectorEngineService director) => Results.Ok(director.PlanYear(req)));
api.MapPost("/director/milestone", (CharacterSnapshotDto req, DirectorEngineService director) => Results.Ok(director.EvaluateMilestone(req)));
api.MapPost("/director/resolve-crucible", (CrucibleTrialRequestDto req, DirectorEngineService director) => Results.Ok(director.ResolveCrucible(req)));

app.Run();
