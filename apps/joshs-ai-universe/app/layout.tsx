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
import "./portfolio.css";
export const metadata: Metadata = {
  title: {
    default: "Joshua Ly — Business, Product & AI Solutions",
    template: "%s | Josh’s AI universe",
  },
  description:
    "Joshua Ly’s work in business analysis, product ownership and practical AI solutions. Explore Jeff Electric and try his working project prototypes.",
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
