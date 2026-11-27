"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-brand-navy text-white w-full" role="navigation" aria-label="Main navigation">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 h-16 md:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-xl md:text-2xl text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
        >
          CommonLife
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10 text-sm text-brand-lightBerry font-body">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded bg-brand-berry text-white text-sm font-heading font-semibold hover:bg-brand-berry/90 transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
        >
          Schedule a Demo
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-navyDark px-5 pb-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-lightBerry py-2 text-base hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex justify-center items-center px-6 py-3 rounded bg-brand-berry text-white font-heading font-semibold text-sm"
            onClick={() => setMenuOpen(false)}
          >
            Schedule a Demo
          </Link>
        </div>
      )}
    </nav>
  );
}
