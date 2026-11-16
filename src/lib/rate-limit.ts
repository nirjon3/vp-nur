/**
 * In-memory sliding-window rate limiter.
 *
 * Suitable for a single Node.js process (self-hosted or local dev).
 * For multi-instance serverless deployments, replace with a shared store
 * (e.g. Redis/Upstash). Storage is bounded and swept on access.
 */

type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();

  // Opportunistic sweep to bound memory
  if (buckets.size > MAX_KEYS) {
    for (const [k, v] of buckets) {
      if (now - v.windowStart > windowMs) buckets.delete(k);
    }
  }

  const existing = buckets.get(key);
  if (!existing || now - existing.windowStart >= windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (existing.count >= limit) {
    const retryAfterSeconds = Math.ceil(
      (existing.windowStart + windowMs - now) / 1000,
    );
    return { ok: false, remaining: 0, retryAfterSeconds };
  }

  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

export function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}
