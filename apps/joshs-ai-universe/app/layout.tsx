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
export const metadata: Metadata = {
  title: {
    default: "Josh’s AI universe — Building with AI at Jeff Electric",
    template: "%s | Josh’s AI universe",
  },
  description:
    "Explore how Joshua Ly uses AI to build solutions for Jeff Electric. Review the business problems, his approach, and the evidence behind the work.",
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
