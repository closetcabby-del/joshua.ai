export function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={`brand-mark ${small ? "small" : ""}`} aria-hidden="true">
      J
    </span>
  );
}
export function Brand() {
  return (
    <a href="/" className="brand" aria-label="Josh's AI universe home">
      Joshua<span className="brand-last">Ly</span>
    </a>
  );
}
