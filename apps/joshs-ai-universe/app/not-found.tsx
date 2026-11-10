import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page-inner document-page">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>That page isn’t here.</h1>
      <p>
        The workspace and Jeff Electric story are a good place to pick things
        up.
      </p>
      <Link className="primary-button" href="/">
        Back to the universe →
      </Link>
    </div>
  );
}
