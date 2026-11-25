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
    <header className="border-b border-clDeepOcean/14 bg-clWhite text-clDeepOcean">
      <div className="mx-auto flex h-[60px] w-full max-w-[1440px] items-center justify-between px-6 min-[1180px]:h-auto min-[1180px]:px-10 min-[1180px]:py-6 min-[1440px]:px-[120px]">
        <Link
          href={marketingRoutes.home}
          className={`rounded-sm ${focusLight}`}
        >
          <Wordmark className="h-[14.92px] w-[124px] min-[1180px]:h-[20.21px] min-[1180px]:w-[168px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 min-[1180px]:flex">
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
          className={`rounded-sm p-1 text-clDeepOcean min-[1180px]:hidden ${focusLight}`}
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
          className="fixed inset-0 z-50 flex flex-col bg-clWhite min-[1180px]:hidden"
        >
          <div className="flex h-[60px] items-center justify-between border-b border-clDeepOcean/14 px-6">
            <Link href={marketingRoutes.home} className={`rounded-sm ${focusLight}`} onClick={() => setMenuOpen(false)}>
              <Wordmark className="h-[14.92px] w-[124px]" />
            </Link>
            <button type="button" className={`rounded-sm p-1 ${focusLight}`} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative close icon */}
              <img src="/homepage/icon-close.svg" alt="" width={24} height={24} />
            </button>
          </div>
          <div className="flex flex-col px-6 pt-4">
            {navLinks.map((link, index) => {
              const className = `flex items-center justify-between py-5 font-lora text-[26px] font-semibold leading-[34px] text-clDeepOcean ${index > 0 ? "border-t border-clDeepOcean/14" : ""} ${focusLight} rounded-sm`;
              const inner = (
                <>
                  {link.label}
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative arrow */}
                  <img src="/homepage/icon-arrow-right.svg" alt="" width={22} height={22} />
                </>
              );
              return link.external ? (
                <a key={link.label} href={link.href} className={className} onClick={() => setMenuOpen(false)}>
                  {inner}
                </a>
              ) : (
                <Link key={link.label} href={link.href} className={className} onClick={() => setMenuOpen(false)}>
                  {inner}
                </Link>
              );
            })}
            <a
              href={APP_URL}
              className={`mt-4 inline-flex h-[53px] items-center justify-center rounded-[4px] bg-clBlue px-7 font-inter text-base font-semibold text-clWhite hover:bg-clOcean ${focusLight}`}
              onClick={() => setMenuOpen(false)}
            >
              Schedule a Demo
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
