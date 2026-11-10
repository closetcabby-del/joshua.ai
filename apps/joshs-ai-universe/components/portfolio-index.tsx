import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function PortfolioIndex() {
  return (
    <aside className="portfolio-index" aria-label="Portfolio contents">
      <div className="index-topline">
        <span>CHOOSE WHERE TO START</span>
      </div>
      <div className="index-entries">
        <Link href="#workspace">
          <span>01</span>
          <div>
            I have a role in mind.<small>Start with the requirements.</small>
          </div>
          <ArrowUpRight size={17} />
        </Link>
        <Link href="#projects">
          <span>02</span>
          <div>
            Show me the Jeff Electric work.
            <small>See how Josh uses AI for the business.</small>
          </div>
          <ArrowUpRight size={17} />
        </Link>
        <Link href="/evidence">
          <span>03</span>
          <div>
            I want to check the details.
            <small>Know what supports each claim.</small>
          </div>
          <ArrowUpRight size={17} />
        </Link>
      </div>
      <span className="index-bottomline">
        SUPPORTED CLAIMS. VISIBLE LIMITS.
      </span>
    </aside>
  );
}
