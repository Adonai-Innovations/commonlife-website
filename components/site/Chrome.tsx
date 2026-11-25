"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const APP_URL = "https://app.commonlife.ai";

const caps = "text-[12px] font-semibold uppercase tracking-[0.18em] text-clWhite hover:underline";
const textLink = "text-[15px] leading-normal text-clWhite hover:underline";

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 19H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const flush = pathname === "/";

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 bg-clDeepOcean">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 min-[768px]:px-10 min-[1180px]:h-[91px] min-[1180px]:px-12">
          <Link href="/" className="shrink-0 rounded-sm" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/homepage-c/logo-wordmark-on-dark.svg"
              alt="CommonLife"
              width={132}
              height={16}
              className="h-[13px] w-[110px] min-[1180px]:h-4 min-[1180px]:w-[132px]"
            />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-9 min-[1180px]:flex">
            <Link className={caps} href="/about">
              About
            </Link>
            <Link className={caps} href="/commonlife-pilot">
              Pilot
            </Link>
            <Link className={caps} href="/contact">
              Contact
            </Link>
            <a
              className="inline-flex items-center rounded-full border border-clWhite px-5 py-[11px] text-[12px] font-semibold uppercase tracking-[0.18em] text-clWhite hover:bg-white/10"
              href={APP_URL}
              rel="noopener noreferrer"
            >
              Schedule a demo
            </a>
          </nav>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm min-[1180px]:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
      {open ? (
        <div id="mobile-menu" className="fixed inset-0 z-30 overflow-y-auto bg-clDeepOcean pt-16 min-[1180px]:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-8 px-6 py-10">
            <Link className="font-lora text-[32px] leading-[40px] text-clWhite" href="/about" onClick={() => setOpen(false)}>
              About CommonLife
            </Link>
            <Link className="font-lora text-[32px] leading-[40px] text-clWhite" href="/commonlife-pilot" onClick={() => setOpen(false)}>
              CommonLife Pilot
            </Link>
            <Link className="font-lora text-[32px] leading-[40px] text-clWhite" href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
            <a className="font-lora text-[32px] leading-[40px] text-clWhite" href={APP_URL} rel="noopener noreferrer" onClick={() => setOpen(false)}>
              CommonLife App
            </a>
            <a
              className="mt-2 inline-flex w-fit items-center rounded-full border border-clWhite px-5 py-[11px] text-[12px] font-semibold uppercase tracking-[0.18em] text-clWhite"
              href={APP_URL}
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Schedule a Demo
            </a>
          </nav>
        </div>
      ) : null}
      <div className={flush ? "" : "pt-16 min-[1180px]:pt-[91px]"}>{children}</div>
      <footer className="bg-clDeepOcean px-6 pb-14 min-[768px]:px-10 min-[1180px]:px-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="h-px w-full bg-clSky" />
          <Link href="/" className="mt-14 block max-w-[1000px] rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/homepage-c/logo-wordmark-footer-on-dark.svg" alt="CommonLife" width={1000} height={120} className="h-auto w-full" />
          </Link>
          <ul className="mt-10 flex flex-col gap-3.5 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:gap-x-10">
            <li><Link className={textLink} href="/about">About Us</Link></li>
            <li><Link className={textLink} href="/contact">Contact</Link></li>
            <li><a className={textLink} href={APP_URL} rel="noopener noreferrer">CommonLife App</a></li>
            <li><Link className={textLink} href="/commonlife-pilot">CommonLife Pilot</Link></li>
            <li><a className={textLink} href={APP_URL} rel="noopener noreferrer">Schedule a Demo</a></li>
          </ul>
          <div className="mt-14 h-px w-full bg-clSky" />
          <div className="mt-8 flex flex-col gap-3 min-[1180px]:flex-row min-[1180px]:justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-clSky">© CommonLife, Inc. All rights reserved.</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-clSky">Built for the Church, powered by truth.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
