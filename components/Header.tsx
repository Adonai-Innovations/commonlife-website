"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/Button";
import { IconArrowRight, IconClose, IconExternal, IconMenu, Wordmark } from "@/components/icons";
import { COMMONLIFE_APP_URL, SCHEDULE_DEMO_URL } from "@/lib/links";

const links = [
  { href: "/about", label: "About CommonLife" },
  { href: "/commonlife-pilot", label: "CommonLife Pilot" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const closeRef = useRef<HTMLButtonElement>(null);

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
    <header className="bg-cl-paper">
      <div className="hidden min-h-[72px] items-center justify-between px-12 py-5 min-[1180px]:flex">
        <div className="flex items-center gap-12">
          <Link href="/" aria-label="CommonLife">
            <Wordmark className="h-[18px] w-[150px]" />
          </Link>
          <nav aria-label="Primary" className="flex gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="font-inter text-[15px] font-medium text-cl-deep-ocean"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ButtonLink href={COMMONLIFE_APP_URL} variant="secondary">
            CommonLife App
          </ButtonLink>
          <ButtonLink href={SCHEDULE_DEMO_URL} variant="primary">
            Schedule a Demo
          </ButtonLink>
        </div>
      </div>

      <div className="flex items-center justify-between py-3 pl-5 pr-3 min-[1180px]:hidden">
        <Link href="/" aria-label="CommonLife">
          <Wordmark className="h-[14px] w-[116px]" />
        </Link>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full bg-cl-white text-cl-deep-ocean"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpenPath(pathname)}
        >
          <IconMenu />
        </button>
      </div>

      {open ? (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 overflow-y-auto bg-cl-paper min-[1180px]:hidden">
          <div className="flex items-center justify-between py-3 pl-5 pr-3">
            <Link href="/" aria-label="CommonLife" onClick={() => setOpenPath(null)}>
              <Wordmark className="h-[14px] w-[116px]" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="flex size-11 items-center justify-center rounded-full bg-cl-white text-cl-deep-ocean"
              aria-label="Close menu"
              onClick={() => setOpenPath(null)}
            >
              <IconClose />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-col gap-2 px-3 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-[20px] bg-cl-white p-5"
                onClick={() => setOpenPath(null)}
              >
                <span className="font-lora text-2xl leading-8 text-cl-deep-ocean">{link.label}</span>
                <IconArrowRight className="size-[22px] text-cl-deep-ocean" />
              </Link>
            ))}
            <a
              href={COMMONLIFE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-[20px] bg-cl-white p-5"
              onClick={() => setOpenPath(null)}
            >
              <span className="font-lora text-2xl leading-8 text-cl-deep-ocean">CommonLife App</span>
              <IconExternal className="size-[22px] text-cl-deep-ocean" />
            </a>
          </nav>
          <div className="px-3 pt-4">
            <ButtonLink href={SCHEDULE_DEMO_URL} variant="primary" className="w-full">
              Schedule a Demo
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
