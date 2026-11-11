"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { useHydrated } from "@/lib/use-hydrated";
const links = [
  ["/#projects", "Projects"],
  ["/#about", "About"],
  ["https://www.linkedin.com/in/joshua-ly/", "LinkedIn"],
  ["/#contact", "Contact"],
];
export function Sidebar() {
  const ready = useHydrated();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const updateHeader = () => setCompact(window.scrollY > 100);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);
  return (
    <header
      className={`site-header${compact ? " is-compact" : ""}`}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          document.getElementById("navigation-toggle")?.focus();
        }
      }}
    >
      <div className="header-inner">
        <Brand />
        <button
          id="navigation-toggle"
          disabled={!ready}
          className="nav-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={open ? "is-open" : ""}
          aria-label="Main navigation"
          onClick={() => setOpen(false)}
        >
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("https:") ? "_blank" : undefined}
              rel={
                href.startsWith("https:") ? "noopener noreferrer" : undefined
              }
              className={href === "/#contact" ? "nav-contact" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
