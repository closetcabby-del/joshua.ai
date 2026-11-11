import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";
vi.mock("@/lib/rate-limit", () => ({
  allowRequest: vi.fn(async () => true),
  liveEnabled: vi.fn(() => false),
}));
import { POST } from "@/app/api/recruiter/route";
import { allowRequest } from "@/lib/rate-limit";
const request = (body: string, headers: Record<string, string> = {}) =>
  new NextRequest("http://localhost:3000/api/recruiter", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      "content-type": "application/json",
      ...headers,
    },
    body,
  });
beforeEach(() => {
  vi.mocked(allowRequest).mockResolvedValue(true);
  delete process.env.APP_ORIGIN;
});
describe("request boundary", () => {
  it("returns a real demo result without a provider", async () => {
    const res = await POST(
      request(
        JSON.stringify({
          tool: "analyze",
          input: "AI solutions consultant with automation experience",
        }),
      ),
    );
    expect(res.status).toBe(200);
    expect((await res.json()).mode).toBe("demo");
    expect(res.headers.get("cache-control")).toBe("no-store");
  });
  it("rejects cross-origin requests", async () => {
    expect(
      (await POST(request("{}", { origin: "https://attacker.example" })))
        .status,
    ).toBe(403);
  });
  it("rejects malformed JSON", async () => {
    expect((await POST(request("{bad"))).status).toBe(400);
  });
  it("bounds streamed bodies even without content length", async () => {
    expect((await POST(request("x".repeat(40001)))).status).toBe(413);
  });
  it("rejects unsupported request content types", async () => {
    expect(
      (await POST(request("{}", { "content-type": "text/plain" }))).status,
    ).toBe(415);
  });
  it("returns clear validation messages", async () => {
    const res = await POST(
      request(JSON.stringify({ tool: "analyze", input: "short" })),
    );
    expect(res.status).toBe(400);
    expect((await res.json()).error).toContain("10 characters");
  });
  it("enforces request limits before inference", async () => {
    vi.mocked(allowRequest).mockResolvedValue(false);
    expect(
      (
        await POST(
          request(
            JSON.stringify({
              tool: "assistant",
              input: "What experience is documented?",
            }),
          ),
        )
      ).status,
    ).toBe(429);
  });
  it("fails closed if the rate-limiter backend is unavailable", async () => {
    vi.mocked(allowRequest).mockRejectedValue(new Error("Offline"));
    expect(
      (
        await POST(
          request(
            JSON.stringify({
              tool: "assistant",
              input: "What experience is documented?",
            }),
          ),
        )
      ).status,
    ).toBe(503);
  });
});

describe("proxy-aware local origins", () => {
  it("uses the browser Host when Next exposes an internal bind address", async () => {
    const req = new NextRequest("http://0.0.0.0:3000/api/recruiter", {
      method: "POST",
      headers: {
        host: "localhost:3000",
        origin: "http://localhost:3000",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tool: "assistant",
        input: "What work is documented?",
      }),
    });
    expect((await POST(req)).status).toBe(200);
  });
});
