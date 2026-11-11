import { describe, it, expect, vi, afterEach } from "vitest";
import { allowRequest, liveEnabled } from "@/lib/rate-limit";
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("cost and production controls", () => {
  it("caps a local client at eight requests per window", async () => {
    for (let i = 0; i < 8; i++)
      expect(await allowRequest("unit-client")).toBe(true);
    expect(await allowRequest("unit-client")).toBe(false);
  });
  it("does not enable live inference without explicit configuration", () => {
    vi.stubEnv("ENABLE_LIVE_AI", "false");
    vi.stubEnv("OPENAI_API_KEY", "fake-test-key");
    expect(liveEnabled()).toBe(false);
  });
  it("requires a distributed limiter and trusted origin for production AI", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ENABLE_LIVE_AI", "true");
    vi.stubEnv("OPENAI_API_KEY", "fake-test-key");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    expect(liveEnabled()).toBe(false);
  });
  it("rejects an invalid remote limiter response", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://limiter.example");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "fake");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => [{ error: "bad command" }],
      })),
    );
    await expect(allowRequest("remote-client")).rejects.toThrow(
      "Rate limiter unavailable",
    );
  });
});
