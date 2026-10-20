using System.IO.Compression;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.ResponseCompression;
using ProjectMoon.Api.Models;
using ProjectMoon.Api.Services;

var builder = WebApplication.CreateSlimBuilder(args);

builder.WebHost.UseUrls(builder.Configuration["Urls"] ?? "http://localhost:5080");
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

// The Vite dev server on this machine or the LAN is the only caller
builder.Services.AddCors(o => o.AddPolicy("Frontend", p => p
    .SetIsOriginAllowed(origin => Uri.TryCreate(origin, UriKind.Absolute, out var uri) && (uri.IsLoopback || uri.Host.StartsWith("192.168.")))
    .AllowAnyHeader()
    .AllowAnyMethod()));

builder.Services.AddSingleton<ArchiveStoreService>();
builder.Services.AddHostedService<ArchiveFlushService>();
builder.Services.AddSingleton<WeaverAiEngineService>();
builder.Services.AddSingleton<DirectorEngineService>();

var app = builder.Build();

app.UseResponseCompression();
app.UseCors("Frontend");

var slotPattern = new Regex("^[a-z0-9_-]{1,32}$", RegexOptions.Compiled);

var api = app.MapGroup("/api");

api.MapGet("/health", (ArchiveStoreService store) => Results.Ok(new HealthDto(
    "ONLINE",
    "ProjectMoon.Api (.NET 8)",
    Math.Round(GC.GetTotalMemory(false) / 1048576.0, 2),
    store.PendingWrites,
    DateTime.UtcNow)));

// Archive: past lives, the codex, events written in the Loom
api.MapGet("/archive", (ArchiveStoreService store) => Results.Ok(store.GetSnapshot()));
api.MapPost("/archive/memorial", (BloodlineMemorialDto memorial, ArchiveStoreService store) => Results.Ok(store.AddMemorial(memorial)));
api.MapPost("/archive/codex", (CodexSyncRequest req, ArchiveStoreService store) => Results.Ok(new CodexResponse(store.SyncCodex(req.Keys))));
api.MapPost("/archive/custom-event", (CustomEventDto customEvent, ArchiveStoreService store) =>
    string.IsNullOrWhiteSpace(customEvent.Id) || string.IsNullOrWhiteSpace(customEvent.Vi)
        ? Results.BadRequest()
        : Results.Ok(new CustomEventsResponse(store.AddCustomEvent(customEvent))));
api.MapGet("/archive/hall-of-fame", (int? take, ArchiveStoreService store) => Results.Ok(store.GetHallOfFame(take ?? 10)));
api.MapGet("/telemetry", (ArchiveStoreService store) => Results.Ok(store.GetTelemetry()));

// The life in progress, so a player can leave mid-run and come back
api.MapGet("/state/{slot}", (string slot, ArchiveStoreService store) =>
    !slotPattern.IsMatch(slot) ? Results.BadRequest() : store.GetRun(slot) is { } run ? Results.Ok(run) : Results.NotFound());
api.MapPut("/state/{slot}", (string slot, RunStateDto run, ArchiveStoreService store) =>
{
    if (!slotPattern.IsMatch(slot) || run.Char.ValueKind != JsonValueKind.Object) return Results.BadRequest();
    store.SaveRun(slot, run);
    return Results.NoContent();
});
api.MapDelete("/state/{slot}", (string slot, ArchiveStoreService store) =>
    !slotPattern.IsMatch(slot) ? Results.BadRequest() : store.DeleteRun(slot) ? Results.NoContent() : Results.NotFound());

api.MapPost("/weaver/evaluate", (WeaverEvaluationRequest req, WeaverAiEngineService weaver) => Results.Ok(weaver.Evaluate(req)));

// Director Engine: offloaded server-side year planning, milestone checks & crucible trials
api.MapPost("/director/plan-year", (PlanYearRequestDto req, DirectorEngineService director) => Results.Ok(director.PlanYear(req)));
api.MapPost("/director/milestone", (CharacterSnapshotDto req, DirectorEngineService director) => Results.Ok(director.EvaluateMilestone(req)));
api.MapPost("/director/resolve-crucible", (CrucibleTrialRequestDto req, DirectorEngineService director) => Results.Ok(director.ResolveCrucible(req)));

app.Run();
