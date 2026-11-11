declare namespace Cloudflare {
  interface Env {
    DB?: import("@cloudflare/workers-types").D1Database;
    BUCKET?: import("@cloudflare/workers-types").R2Bucket;
  }
}
