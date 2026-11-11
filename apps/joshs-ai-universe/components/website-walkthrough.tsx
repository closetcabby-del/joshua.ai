import Image from "next/image";
import styles from "./website-walkthrough.module.css";

const source =
  "https://github.com/closetcabby-del/joshua.ai/blob/d70c684b6ae35263497cfe5eae43cf6c4fb966d0/assets/jeff-electric-live-preview.jpg";

export function WebsiteWalkthrough() {
  return (
    <section
      id="website-walkthrough"
      className="section-anchor"
      aria-labelledby="walkthrough-title"
    >
      <span className="eyebrow">INSPECT AN ACTUAL ARTIFACT</span>
      <h2 id="walkthrough-title">A customer’s first step.</h2>
      <p>
        This is the public website screenshot in the reviewed portfolio. The
        numbered notes show what is visible in that artifact. The image is
        unchanged; it is not a new production capture or an internal-tool demo.
      </p>
      <figure className={styles.figure}>
        <div className={styles.image}>
          <Image
            src="/jeff-electric-website.jpg"
            alt="Reviewed Jeff Electric homepage: a question about the customer’s electrical concern, a team photograph, and call and estimate actions. Three numbered observations are explained below."
            width={1348}
            height={926}
            sizes="(max-width: 760px) 100vw, 900px"
            unoptimized
          />
          <span className={`${styles.marker} ${styles.one}`} aria-hidden="true">
            1
          </span>
          <span className={`${styles.marker} ${styles.two}`} aria-hidden="true">
            2
          </span>
          <span
            className={`${styles.marker} ${styles.three}`}
            aria-hidden="true"
          >
            3
          </span>
        </div>
        <figcaption>
          Website snapshot from the public portfolio source, commit d70c684.
          Capture date and individual authorship are not established.{" "}
          <a href={source}>Inspect the original image</a>.
        </figcaption>
      </figure>
      <ol className={styles.notes}>
        <li>
          <h3>Start with the customer’s concern</h3>
          <p>
            The opening asks, “Something wrong with your home’s electrical?” The
            supporting text asks the visitor to describe what they notice
            without diagnosing it themselves.
          </p>
        </li>
        <li>
          <h3>Show the people behind the service</h3>
          <p>
            The screenshot includes a team photograph labeled “Your local Jeff
            Electric team.” This shows how the business presents itself; it does
            not verify anyone’s role or qualifications.
          </p>
        </li>
        <li>
          <h3>Make the next action visible</h3>
          <p>
            “Call now” and “Request an estimate” are visible beside the
            introduction. The screenshot shows those choices, not what happens
            after a submission. No call, estimate or customer job was initiated
            for this review.
          </p>
        </li>
      </ol>
      <div className={styles.boundary}>
        <h3>What this review establishes</h3>
        <p>
          A genuine website artifact can be inspected against its immutable
          source. It does not establish Josh’s individual authorship, a working
          internal handoff, or a measured business result. His reported
          contribution and decisions are described separately below.
        </p>
      </div>
      <details className={styles.transcript}>
        <summary>Read the artifact review transcript</summary>
        <p>
          Input: the reviewed public website image. Observation one: a visitor
          can describe an electrical concern. Observation two: the business
          presents its team. Observation three: call and estimate actions are
          visible. Reviewed output: these observations and the original image.
          Verification: the image matches the cited source bytes. No form
          routing, internal integration, personal authorship or business impact
          was tested by this inspection.
        </p>
      </details>
      <p className={styles.links}>
        <a href="/evidence#jeff-public-artifact">
          Review the website evidence record
        </a>
        <a href={source}>Open the source snapshot</a>
      </p>
    </section>
  );
}
