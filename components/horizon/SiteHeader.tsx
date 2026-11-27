"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { SCHEDULE_DEMO_URL } from "@/lib/links";

const NAV = [
  { label: "About CommonLife", href: "/about" },
  { label: "CommonLife Pilot", href: "/commonlife-pilot" },
  { label: "Contact", href: "/contact" },
] as const;

export default function SiteHeader({ overlay }: { overlay: boolean }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!overlay) return;
    const header = headerRef.current;
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!header || !hero) return;
    const onScroll = () => {
      const solid = hero.getBoundingClientRect().bottom <= header.getBoundingClientRect().height;
      header.dataset.solid = solid ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [overlay]);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const root = menuRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>("a, button") ?? []).filter((node) => !node.hasAttribute("disabled"));
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const nodes = focusables();
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={overlay ? "site-header site-header--overlay" : "site-header site-header--flow"}
      data-solid={overlay ? "false" : "true"}
    >
      <div className="header-desktop">
        <div className="header-brand">
          <Link href="/" aria-label="CommonLife">
            <span className="wordmark" />
          </Link>
          <nav className="header-nav" aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.href} className="nav-link" href={item.href} data-contrast={overlay ? "white" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-actions">
          <a className="app-link" href={SCHEDULE_DEMO_URL} target="_blank" rel="noopener noreferrer" data-contrast={overlay ? "white" : undefined}>
            CommonLife App
          </a>
          <a className="btn" href={SCHEDULE_DEMO_URL} target="_blank" rel="noopener noreferrer" data-contrast={overlay ? "white" : undefined}>
            Schedule a Demo
          </a>
        </div>
      </div>

      <div className="header-mobile-bar">
        <Link href="/" aria-label="CommonLife">
          <span className="wordmark" />
        </Link>
        <button
          ref={toggleRef}
          className="icon-btn"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          data-open={open ? "true" : "false"}
          onClick={() => setOpen((value) => !value)}
        />
      </div>

      {open ? (
        <div className="menu" id={menuId} ref={menuRef} role="dialog" aria-modal="true" aria-label="Menu">
          <div className="header-mobile-bar">
            <Link href="/" aria-label="CommonLife" onClick={() => setOpen(false)}>
              <span className="wordmark" />
            </Link>
            <button className="icon-btn" type="button" aria-label="Close menu" data-open="true" onClick={() => setOpen(false)} />
          </div>
          <nav className="menu-links" aria-label="Primary">
            {NAV.map((item) => (
              <Link key={item.href} className="menu-link" href={item.href} onClick={() => setOpen(false)}>
                {item.label}
                <span className="arrow" aria-hidden="true" />
              </Link>
            ))}
            <a className="menu-link" href={SCHEDULE_DEMO_URL} target="_blank" rel="noopener noreferrer">
              CommonLife App
              <span className="external" aria-hidden="true" />
            </a>
          </nav>
          <div className="menu-action">
            <a className="btn" href={SCHEDULE_DEMO_URL} target="_blank" rel="noopener noreferrer">
              Schedule a Demo
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
