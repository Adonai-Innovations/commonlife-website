"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/Button";
import Wordmark from "@/components/Wordmark";
import { SCHEDULE_DEMO_URL } from "@/lib/links";

const links = [
  { href: "/about", label: "About CommonLife" },
  { href: "/commonlife-pilot", label: "CommonLife Pilot" },
  { href: "/contact", label: "Contact" },
] as const;

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header({ tone = "light", fixed = false }: { tone?: "light" | "dark"; fixed?: boolean }) {
  const pathname = usePathname();
  const dark = tone === "dark";
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const closeRef = useRef<HTMLButtonElement>(null);
  const navClass = dark ? "text-cl-white" : "text-cl-deep-ocean";

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className={`${fixed ? "fixed inset-x-0 top-0 z-40" : "relative"} ${dark ? "bg-cl-deep-ocean" : "bg-cl-paper"}`}>
      <div className="mx-auto hidden h-20 items-center justify-between px-12 desktop:flex">
        <Link href="/" aria-label="CommonLife" className={navClass}>
          <Wordmark className="h-[22px] w-[180px]" />
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`px-1 py-2 font-inter text-[15px] font-medium leading-5 ${navClass}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SCHEDULE_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-1 py-2 font-inter text-[15px] font-medium leading-5 ${navClass}`}
          >
            CommonLife App
          </a>
          <ButtonLink href={SCHEDULE_DEMO_URL} variant={dark ? "secondary-dark" : "primary"}>
            Schedule a Demo
          </ButtonLink>
        </nav>
      </div>

      <div className="flex h-16 items-center justify-between px-5 desktop:hidden">
        <Link href="/" aria-label="CommonLife" className={navClass}>
          <Wordmark className="h-[18px] w-[148px]" />
        </Link>
        <button
          type="button"
          className={`flex size-11 items-center justify-center rounded-full border ${dark ? "border-cl-white text-cl-white" : "border-cl-deep-ocean text-cl-deep-ocean"}`}
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpenPath(pathname)}
        >
          <MenuIcon />
        </button>
      </div>

      {open ? (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-cl-deep-ocean text-cl-white desktop:hidden">
          <div className="flex h-16 items-center justify-between px-5">
            <Link href="/" aria-label="CommonLife" onClick={() => setOpenPath(null)}>
              <Wordmark className="h-[18px] w-[148px]" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="flex size-11 items-center justify-center rounded-full border border-cl-white font-inter text-lg leading-none text-cl-white"
              aria-label="Close menu"
              onClick={() => setOpenPath(null)}
            >
              ✕
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col items-center gap-7 px-5 pt-16">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-[15px] font-medium leading-5 text-cl-white"
                onClick={() => setOpenPath(null)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SCHEDULE_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[15px] font-medium leading-5 text-cl-white"
              onClick={() => setOpenPath(null)}
            >
              CommonLife App
            </a>
            <ButtonLink href={SCHEDULE_DEMO_URL} variant="secondary-dark" className="mt-2">
              Schedule a Demo
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
