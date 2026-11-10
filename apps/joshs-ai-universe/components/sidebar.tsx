"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "./brand";
const links = [
  ["/#workspace", "Recruiter workspace"],
  ["/#projects", "Jeff Electric"],
  ["/#about", "About Josh"],
  ["/evidence", "Evidence library"],
];
export function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button
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
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
