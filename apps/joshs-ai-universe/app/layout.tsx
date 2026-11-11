import type { Metadata } from "next";
import localFont from "next/font/local";
const manrope = localFont({
  src: [
    { path: "../public/fonts/manrope-400.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/manrope-500.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/manrope-600.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/manrope-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
});
import { Sidebar } from "@/components/sidebar";
import "./globals.css";
import "./studio.css";
export const metadata: Metadata = {
  title: {
    default: "Joshua Ly — Interactive AI Systems Portfolio",
    template: "%s | Josh’s AI universe",
  },
  description:
    "Explore Joshua Ly’s business analysis, product thinking and AI systems through Jeff Electric, BuildBrief and the Sprint & Backlog Planner.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Sidebar />
        <main id="main" className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
