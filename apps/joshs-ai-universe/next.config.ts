import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      ...[
        "recruiter-workspace",
        "workflow-discovery",
        "human-agent-handoff",
        "service-business-workflows",
      ].map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/projects/jeff-electric-daily-operations-hub",
        permanent: true,
      })),
      ...["buildbrief", "sprint-backlog-planner"].map((slug) => ({
        source: `/projects/${slug}`,
        destination: "/#projects",
        permanent: false,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
      {
        source: "/demos/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'none'; frame-ancestors 'self'; base-uri 'none'; form-action 'none'; sandbox allow-scripts allow-forms allow-downloads allow-modals",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
