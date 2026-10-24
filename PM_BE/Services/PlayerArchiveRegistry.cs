using System.Collections.Concurrent;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace ProjectMoon.Api.Services;

public sealed class PlayerArchiveRegistry(IWebHostEnvironment env, ILoggerFactory loggerFactory)
{
    private static readonly Regex TokenPattern = new("^[a-f0-9]{64}$", RegexOptions.Compiled);
    private readonly ConcurrentDictionary<string, ArchiveStoreService> _stores = new();

    public int PendingWrites => _stores.Values.Sum(store => store.PendingWrites);

    public ArchiveStoreService? ForRequest(HttpContext context)
    {
        var token = context.Request.Headers["X-Player-Token"].ToString();
        if (!TokenPattern.IsMatch(token)) return null;

        var key = Convert.ToHexString(SHA256.HashData(Encoding.ASCII.GetBytes(token))).ToLowerInvariant();
        return _stores.GetOrAdd(key, id => new ArchiveStoreService(
            env, loggerFactory.CreateLogger<ArchiveStoreService>(), id));
    }

    public async Task FlushAsync(CancellationToken cancellationToken)
    {
        foreach (var store in _stores.Values)
        {
            await store.FlushAsync(cancellationToken);
        }
    }
}
