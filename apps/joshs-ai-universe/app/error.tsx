"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="page-inner document-page">
      <h1>Something interrupted the page.</h1>
      <p>Try loading it again.</p>
      <button className="primary-button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
