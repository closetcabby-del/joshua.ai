import Link from "next/link";
export function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark ${small ? "small" : ""}`} aria-hidden="true">
      J
    </span>
  );
}
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="Josh's AI universe home">
      <Mark />
      <span>
        Josh’s<span className="brand-sub">AI universe</span>
      </span>
    </Link>
  );
}
