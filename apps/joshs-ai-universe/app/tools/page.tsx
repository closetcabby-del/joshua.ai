import { ArrowLeft } from "lucide-react";
import { Workspace } from "@/components/workspace";
import { approvedRecords } from "@/lib/knowledge";
import { liveEnabled } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const metadata = { title: "Portfolio tools · Demo" };

export default function Tools() {
  return (
    <div className="page-inner tools-page">
      <a className="back-link" href="/">
        <ArrowLeft size={15} /> Back to the Jeff Electric story
      </a>
      <h1>Optional portfolio tools.</h1>
      <p className="tools-intro">
        An optional demo built around the portfolio’s source records. Start with
        the case study to see the work in context.
      </p>
      <Workspace live={liveEnabled() && approvedRecords.length > 0} />
    </div>
  );
}
