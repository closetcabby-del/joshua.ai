import { createHmac } from "node:crypto";
const buckets = new Map<string, { count: number; reset: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 8;
export async function allowRequest(ip: string): Promise<boolean> {
  const secret = process.env.RATE_LIMIT_SECRET || "local-development-only";
  const id = createHmac("sha256", secret).update(ip).digest("hex").slice(0, 32);
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    const key = `recruiter:${id}:${Math.floor(Date.now() / WINDOW)}`;
    const result = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, 660],
      ]),
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!result.ok) throw new Error("Rate limiter unavailable");
    const data = await result.json();
    if (
      !Array.isArray(data) ||
      !Number.isInteger(data[0]?.result) ||
      data.some((r: { error?: string }) => r.error)
    )
      throw new Error("Rate limiter unavailable");
    return data[0].result <= LIMIT;
  }
  const now = Date.now();
  for (const [key, bucket] of buckets)
    if (bucket.reset <= now) buckets.delete(key);
  if (buckets.size >= 5000 && !buckets.has(id)) return false;
  const bucket = buckets.get(id);
  if (!bucket) {
    buckets.set(id, { count: 1, reset: now + WINDOW });
    return true;
  }
  bucket.count++;
  return bucket.count <= LIMIT;
}
export function liveEnabled() {
  return (
    process.env.ENABLE_LIVE_AI === "true" &&
    !!process.env.OPENAI_API_KEY &&
    (process.env.NODE_ENV !== "production" ||
      !!(
        process.env.UPSTASH_REDIS_REST_URL &&
        process.env.UPSTASH_REDIS_REST_TOKEN &&
        process.env.RATE_LIMIT_SECRET &&
        process.env.APP_ORIGIN
      ))
  );
}
