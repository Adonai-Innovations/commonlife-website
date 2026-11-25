"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { APP_URL, marketingRoutes } from "@/lib/site-links";

const navLinks = [
  { label: "About CommonLife", href: marketingRoutes.about, external: false },
  { label: "CommonLife Pilot", href: marketingRoutes.pilot, external: false },
  { label: "Contact", href: marketingRoutes.contact, external: false },
  { label: "CommonLife App", href: APP_URL, external: true },
] as const;

const focusLight =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clBlue";

function Wordmark({ className }: { className: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- sized SVG wordmark, not a photo
    <img
      src="/homepage/logo-wordmark-on-light.svg"
      alt="CommonLife"
      width={168}
      height={21}
      className={className}
    />
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="border-b border-clDeepOcean bg-clWhite text-clDeepOcean">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-[18px] min-[1100px]:px-10 min-[1100px]:py-6 min-[1440px]:px-[120px]">
        <Link
          href={marketingRoutes.home}
          className={`rounded-sm ${focusLight}`}
        >
          <Wordmark className="h-[14.92px] w-[124px] min-[1100px]:h-[20.21px] min-[1100px]:w-[168px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 min-[1100px]:flex">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className={`py-2.5 font-inter text-[15px] font-medium text-clDeepOcean hover:underline hover:underline-offset-4 ${focusLight} rounded-sm`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`py-2.5 font-inter text-[15px] font-medium text-clDeepOcean hover:underline hover:underline-offset-4 ${focusLight} rounded-sm`}
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href={APP_URL}
            className={`inline-flex h-[53px] items-center rounded-[4px] bg-clBlue px-7 font-inter text-base font-semibold text-clWhite hover:bg-clOcean motion-reduce:transition-none ${focusLight}`}
          >
            Schedule a Demo
          </a>
        </nav>

        <button
          type="button"
          className={`rounded-sm p-1 text-clDeepOcean min-[1100px]:hidden ${focusLight}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none">
              <path d="M6 6L18 18" stroke="#062F45" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="#062F45" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- decorative menu icon
            <img src="/homepage/icon-menu.svg" alt="" width={24} height={24} />
          )}
        </button>
      </div>

      {menuOpen ? (
        <nav
          id={menuId}
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-clDeepOcean bg-clWhite px-6 py-4 min-[1100px]:hidden"
        >
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                className={`py-3 font-inter text-[15px] font-medium text-clDeepOcean ${focusLight} rounded-sm`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`py-3 font-inter text-[15px] font-medium text-clDeepOcean ${focusLight} rounded-sm`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ),
          )}
          <a
            href={APP_URL}
            className={`mt-2 inline-flex h-[53px] items-center justify-center rounded-[4px] bg-clBlue px-7 font-inter text-base font-semibold text-clWhite hover:bg-clOcean ${focusLight}`}
            onClick={() => setMenuOpen(false)}
          >
            Schedule a Demo
          </a>
        </nav>
      ) : null}
    </header>
  );
}
