"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import {
  chapters,
  chapterIndexFromProgress,
  footer,
  hero,
  media,
  nav,
  pilot,
  rangeProgress,
  routes,
  statement,
  storyProgress,
} from "@/lib/homepage-c-copy";
import "./home-c.css";

const outlinePill =
  "inline-flex items-center rounded-full border border-clWhite px-5 py-[11px] text-[12px] font-semibold uppercase tracking-[0.18em] text-clWhite hover:bg-white/10";
const capsLink =
  "text-[12px] font-semibold uppercase tracking-[0.18em] text-clWhite hover:underline";
const textLink = "text-[15px] leading-normal text-clWhite hover:underline";

type Phase = "hero" | "chapters";

export default function HomeC({ fontVariable }: { fontVariable: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const chaptersRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("hero");
  const [cinematic, setCinematic] = useState(true);
  const [motionOn, setMotionOn] = useState(true);
  const [ministry, setMinistry] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const heroEl = heroRef.current;
    const chapterEl = chaptersRef.current;
    const mediaEl = mediaRef.current;
    const statementEl = statementRef.current;
    if (!root || !heroEl || !chapterEl) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    let frame = 0;
    let index = 0;
    let currentPhase: Phase = "hero";
    let currentCinematic = true;

    const measure = () => {
      frame = 0;
      if (!motion.matches) {
        setMotionOn(false);
        if (currentCinematic) {
          currentCinematic = false;
          setCinematic(false);
        }
        root.removeAttribute("data-animate");
        return;
      }
      setMotionOn(true);

      const viewport = window.innerHeight;
      const heroRect = heroEl.getBoundingClientRect();
      const chapterRect = chapterEl.getBoundingClientRect();
      const heroP = rangeProgress(heroRect.top, heroEl.offsetHeight, viewport);
      const chapterP = rangeProgress(chapterRect.top, chapterEl.offsetHeight, viewport);
      const heroSpan = Math.max(heroEl.offsetHeight - viewport, 0);
      const chapterSpan = Math.max(chapterEl.offsetHeight - viewport, 0);
      root.style.setProperty("--hero-p", heroP.toFixed(4));
      root.style.setProperty(
        "--story",
        storyProgress(heroP, heroSpan, chapterP, chapterSpan).toFixed(4),
      );

      const nextIndex = chapterIndexFromProgress(chapterP, chapters.length);
      const nextPhase: Phase = chapterRect.top <= 1 ? "chapters" : "hero";
      const nextCinematic = heroRect.top < viewport && chapterRect.bottom > viewport - 1;
      if (nextIndex !== index) {
        index = nextIndex;
        setActiveIndex(nextIndex);
      }
      if (nextPhase !== currentPhase) {
        currentPhase = nextPhase;
        setPhase(nextPhase);
      }
      if (nextCinematic !== currentCinematic) {
        currentCinematic = nextCinematic;
        setCinematic(nextCinematic);
      }

      if (mediaEl) {
        const rect = mediaEl.getBoundingClientRect();
        const progress = (viewport - rect.top) / (viewport + rect.height);
        const shift = Math.max(-12, Math.min(12, (progress - 0.5) * 24));
        root.style.setProperty("--shift", `${shift.toFixed(2)}px`);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    let observer: IntersectionObserver | undefined;
    if (motion.matches && statementEl) {
      const rect = statementEl.getBoundingClientRect();
      const seen = rect.top < window.innerHeight * 0.86 && rect.bottom > 0;
      if (!seen) root.setAttribute("data-animate", "true");
      const show = () => {
        statementEl.querySelectorAll(".statement-line").forEach((line) => {
          line.classList.add("is-shown");
        });
      };
      if (seen) show();
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) show();
        },
        { threshold: 0.35 },
      );
      observer.observe(statementEl);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    motion.addEventListener("change", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      motion.removeEventListener("change", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  const goToChapter = (index: number) => {
    const chapter = chapters[index];
    if (!chapter) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.getElementById(chapter.id)?.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    const el = chaptersRef.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const target = top + (span * (index + 0.45)) / chapters.length;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const counter = phase === "chapters" ? chapters[activeIndex].counter : hero.counter;

  return (
    <div
      ref={rootRef}
      className={`home-c ${fontVariable}`}
      data-chapter={activeIndex}
      data-cinematic={cinematic ? "true" : "false"}
    >
      <noscript>
        <style>{`
          .hero-track { height: auto !important; }
          .hero-sticky { position: relative !important; height: auto !important; min-height: 100svh !important; }
          .chapters-track { height: auto !important; }
          .chapters-sticky { display: none !important; }
          .chapters-static { display: block !important; }
          .topbar, .scroll-chrome { position: static !important; visibility: visible !important; }
          .scroll-chrome { display: none !important; }
          .hero-static-chrome { display: flex !important; }
          .hero-lockup, .chapter-pane, .chapter-screen { opacity: 1 !important; visibility: visible !important; animation: none !important; }
        `}</style>
      </noscript>

      <header className="topbar" inert={motionOn && !cinematic ? true : undefined}>
        <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-5 min-[1180px]:h-[91px] min-[1180px]:px-12">
          <Link href={routes.home} className="shrink-0 rounded-sm">
            {/* Local SVG wordmark. next/image refuses SVG because dangerouslyAllowSVG is off. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/homepage-c/logo-wordmark-on-dark.svg"
              alt="CommonLife"
              width={132}
              height={16}
              className="h-3.5 w-auto min-[1180px]:h-4 min-[1180px]:w-[132px]"
            />
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-9">
            <ul className="hidden items-center gap-9 min-[1180px]:flex">
              <li>
                <Link className={capsLink} href={routes.about}>
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link className={capsLink} href={routes.contact}>
                  {nav.contact}
                </Link>
              </li>
            </ul>
            <a
              className={`${outlinePill} whitespace-nowrap px-3 py-2 text-[11px] tracking-[0.14em] min-[1180px]:px-5 min-[1180px]:py-[11px] min-[1180px]:text-[12px] min-[1180px]:tracking-[0.18em]`}
              href={routes.app}
              rel="noopener noreferrer"
            >
              {nav.demo}
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section ref={heroRef} className="hero-track" aria-labelledby="hero-title">
          <div className="hero-sticky stage-pad flex flex-col">
            <div className="relative flex min-h-0 flex-1 items-center justify-center">
              <div className="hero-glow" aria-hidden="true" />
              <div className="hero-phone relative aspect-[253/500] h-[min(420px,46svh)] w-auto overflow-hidden rounded-[33px] min-[1180px]:h-[min(500px,calc(100svh-380px))]">
                <Image
                  src="/homepage-c/app-bible-reader.jpeg"
                  alt="CommonLife Bible reader open to Genesis 1 in the NIV"
                  fill
                  priority
                  sizes="280px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="hero-lockup px-6 pb-2 text-center">
              <h1
                id="hero-title"
                className="font-lora text-[40px] font-medium leading-[46px] tracking-[-0.01em] text-balance text-clWhite min-[1180px]:text-[72px] min-[1180px]:leading-[80px]"
              >
                Faith meets
                <br className="min-[1180px]:hidden" /> technology
              </h1>
              <p className="mx-auto mt-4 max-w-[18rem] text-[11px] font-semibold uppercase leading-normal tracking-[0.22em] text-clSky min-[1180px]:max-w-none min-[1180px]:text-[13px] min-[1180px]:tracking-[0.3em]">
                {hero.subline}
              </p>
              <div className="mx-auto mt-4 h-9 w-px bg-clSky" aria-hidden="true" />
            </div>
            <Chrome counter={hero.counter} progress={0.2} className="hero-static-chrome" />
          </div>
        </section>

        <section ref={chaptersRef} className="chapters-track" aria-label="Chapters">
          <div className="chapters-sticky stage-pad flex-col">
            <div className="chapter-layout px-6 min-[1180px]:px-0">
              <div className="chapter-copy">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    data-index={index}
                    className="chapter-pane absolute inset-0 flex flex-col gap-5"
                    aria-hidden={index !== activeIndex}
                    inert={index === activeIndex ? undefined : true}
                    aria-label={chapter.title ? undefined : chapter.label}
                  >
                    <p className="text-[12px] font-semibold tracking-[0.2em] text-clSky min-[1180px]:text-[13px]">
                      {chapter.counter}
                    </p>
                    {chapter.title ? (
                      <h2 className="font-lora text-[34px] font-medium leading-[40px] tracking-[-0.005em] text-clWhite min-[1180px]:text-[48px] min-[1180px]:leading-[56px]">
                        {chapter.title}
                      </h2>
                    ) : null}
                    {chapter.mobileBody ? (
                      <p className="text-[15px] leading-[24px] text-clSky min-[1180px]:hidden">
                        {chapter.mobileBody}
                      </p>
                    ) : null}
                    <p
                      className={`text-[15px] leading-[24px] text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-[28px] ${chapter.mobileBody ? "hidden min-[1180px]:block" : ""}`}
                    >
                      {chapter.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="chapter-stage">
                <div className="chapter-glow" aria-hidden="true" />
                <div className="relative aspect-[300/634] h-[min(400px,calc(100svh-400px))] w-auto overflow-hidden rounded-[36px] ring-8 ring-clOceanCard min-[1180px]:h-[min(634px,calc(100svh-230px))]">
                  {chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      data-index={index}
                      className="chapter-screen absolute inset-0"
                      aria-hidden={index !== activeIndex}
                    >
                      <Image
                        src={chapter.image}
                        alt={index === activeIndex ? chapter.alt : ""}
                        fill
                        sizes="300px"
                        priority={index === 0}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <ChapterNav active={activeIndex} pinned onSelect={goToChapter} />
            </div>
          </div>

          <div className="chapters-static">
            {chapters.map((chapter, index) => (
              <article
                key={chapter.id}
                id={chapter.id}
                aria-label={chapter.title ?? chapter.label}
                className="relative px-6 py-16 min-[1180px]:px-[clamp(24px,8vw,120px)] min-[1180px]:py-28"
              >
                <div className="mx-auto grid max-w-[1200px] items-center gap-10 min-[1180px]:grid-cols-[minmax(0,380px)_minmax(180px,1fr)_minmax(140px,240px)]">
                  <div className="flex flex-col gap-5">
                    <p className="text-[12px] font-semibold tracking-[0.2em] text-clSky min-[1180px]:text-[13px]">
                      {chapter.counter}
                    </p>
                    {chapter.title ? (
                      <h2 className="font-lora text-[34px] font-medium leading-[40px] tracking-[-0.005em] text-clWhite min-[1180px]:text-[48px] min-[1180px]:leading-[56px]">
                        {chapter.title}
                      </h2>
                    ) : null}
                    <p className="text-[15px] leading-[24px] text-clSky min-[1180px]:hidden">
                      {chapter.mobileBody ?? chapter.body}
                    </p>
                    <p className="hidden text-[17px] leading-[28px] text-clSky min-[1180px]:block">
                      {chapter.body}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative aspect-[300/634] h-[460px] w-auto overflow-hidden rounded-[36px] ring-8 ring-clOceanCard">
                      <Image
                        src={chapter.image}
                        alt={chapter.alt}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <ChapterNav active={index} onSelect={goToChapter} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <Chrome counter={counter} className="scroll-chrome" />

        <section
          ref={statementRef}
          className="bg-clDeepOcean px-6 py-24 min-[1180px]:px-[clamp(24px,8vw,120px)] min-[1180px]:pb-[160px] min-[1180px]:pt-[200px]"
          aria-label={statement.reference}
        >
          <div className="mx-auto max-w-[960px]">
            <p className="statement-line font-lora text-[30px] leading-[38px] tracking-[-0.01em] text-clWhite min-[1180px]:text-[60px] min-[1180px]:leading-[72px]">
              {statement.lead}
            </p>
            <blockquote className="statement-line font-lora m-0 text-[30px] italic leading-[38px] tracking-[-0.01em] text-clSky min-[1180px]:text-[60px] min-[1180px]:leading-[72px]">
              {statement.scripture}
            </blockquote>
            <p className="statement-line mt-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-clSky min-[1180px]:text-[12px]">
              <span className="inline-block size-2 shrink-0 rounded-full bg-clAmber" aria-hidden="true" />
              {statement.reference}
            </p>
          </div>
        </section>

        <section
          ref={mediaRef}
          className="bg-clDeepOcean px-6 pb-20 min-[1180px]:px-[120px] min-[1180px]:pb-[160px]"
        >
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4">
            <figure className="relative m-0 h-[220px] overflow-hidden min-[1180px]:h-[620px]">
              <Image
                src={media.openBible.src}
                alt={media.openBible.alt}
                fill
                sizes="(min-width: 1180px) 1200px, 100vw"
                className="media-photo object-cover"
              />
            </figure>
            <div className="flex flex-col gap-4 min-[1180px]:flex-row">
              <figure className="relative m-0 h-[420px] overflow-hidden min-[1180px]:h-[720px] min-[1180px]:flex-1">
                <Image
                  src={media.morning.src}
                  alt={media.morning.alt}
                  fill
                  sizes="(min-width: 1180px) 592px, 100vw"
                  className="media-photo-late object-cover"
                />
              </figure>
              <div className="flex items-center justify-center py-8 min-[1180px]:h-[720px] min-[1180px]:flex-1 min-[1180px]:bg-clOceanCard min-[1180px]:py-0">
                <div className="relative h-[480px] w-[226px] overflow-hidden rounded-[34px] min-[1180px]:h-[613px] min-[1180px]:w-[290px] min-[1180px]:border-8 min-[1180px]:border-clDeepOcean">
                  <Image
                    src={media.study.src}
                    alt={media.study.alt}
                    fill
                    sizes="290px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-clDeepOcean px-6 pb-20 min-[1180px]:px-[120px] min-[1180px]:pb-[160px]">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-8 border border-clSky p-6 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-24 min-[1180px]:p-20">
            <h2 className="font-lora text-[32px] leading-[40px] tracking-[-0.01em] text-clWhite min-[1180px]:w-[420px] min-[1180px]:shrink-0 min-[1180px]:text-[56px] min-[1180px]:leading-[64px]">
              {pilot.statement}
            </h2>
            <div className="min-w-0 flex-1">
              <h3 className="font-lora text-[22px] font-medium leading-8 text-clWhite min-[1180px]:text-[36px] min-[1180px]:leading-[44px]">
                {pilot.heading}
              </h3>
              <p className="mt-6 text-[15px] leading-6 text-clSky min-[1180px]:text-[17px] min-[1180px]:leading-7">
                {pilot.body}
              </p>
              <div
                role="radiogroup"
                aria-label="Level of support"
                className="mt-6 flex flex-col items-start gap-2.5 min-[1180px]:flex-row min-[1180px]:flex-wrap"
                onKeyDown={(event) => {
                  const nextKey = event.key === "ArrowRight" || event.key === "ArrowDown";
                  const prevKey = event.key === "ArrowLeft" || event.key === "ArrowUp";
                  if (!nextKey && !prevKey) return;
                  event.preventDefault();
                  const delta = nextKey ? 1 : -1;
                  const next = (ministry + delta + pilot.ministries.length) % pilot.ministries.length;
                  setMinistry(next);
                  const group = event.currentTarget;
                  const buttons = group.querySelectorAll<HTMLButtonElement>('[role="radio"]');
                  buttons[next]?.focus();
                }}
              >
                {pilot.ministries.map((label, index) => {
                  const selected = index === ministry;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setMinistry(index)}
                      className={
                        selected
                          ? "border border-clWhite bg-clWhite px-4 py-2.5 text-left text-[14px] font-semibold text-clDeepOcean"
                          : "border border-clSky px-4 py-2.5 text-left text-[14px] font-medium text-clWhite hover:border-clWhite"
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-clDeepOcean px-6 pb-14 min-[1180px]:px-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="h-px w-full bg-clSky" />
          <Link href={routes.home} className="mt-14 block max-w-[1000px] rounded-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/homepage-c/logo-wordmark-footer-on-dark.svg"
              alt="CommonLife"
              width={1000}
              height={120}
              className="h-auto w-full"
            />
          </Link>
          <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 min-[1180px]:flex min-[1180px]:gap-0">
            <nav aria-label={footer.columnLabel} className="flex flex-col gap-3.5 min-[1180px]:w-[220px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-clSky">
                {footer.columnLabel}
              </p>
              <Link className={textLink} href={routes.about}>
                {footer.about}
              </Link>
              <Link className={textLink} href={routes.contact}>
                {footer.contact}
              </Link>
            </nav>
            <ul className="flex flex-col gap-3.5 pt-7 min-[1180px]:w-[220px]">
              <li>
                <a className={textLink} href={routes.app} rel="noopener noreferrer">
                  {footer.app}
                </a>
              </li>
            </ul>
            <ul className="col-span-2 flex flex-col gap-3.5 min-[1180px]:w-[220px] min-[1180px]:pt-7">
              <li>
                <a className={textLink} href={routes.app} rel="noopener noreferrer">
                  {footer.demo}
                </a>
              </li>
              <li>
                <Link className={textLink} href={routes.contact}>
                  {footer.contactUs}
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-14 h-px w-full bg-clSky" />
          <div className="mt-8 flex flex-col gap-3 min-[1180px]:flex-row min-[1180px]:items-start min-[1180px]:justify-between">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-clSky">{footer.legal}</p>
            <p className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-clSky min-[1180px]:block">
              {footer.tagline}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Chrome({
  counter,
  progress,
  className,
}: {
  counter: string;
  progress?: number;
  className: string;
}) {
  const style = (
    progress === undefined ? undefined : { "--story": String(progress) }
  ) as CSSProperties | undefined;
  return (
    <div
      className={`${className} items-center justify-between px-6 pb-7 pt-5 min-[1180px]:px-12`}
      style={style}
      aria-hidden="true"
    >
      <div className="hidden min-[1180px]:block min-[1180px]:w-[360px]" />
      <div className="h-[2px] w-12 overflow-hidden bg-clOceanCard min-[1180px]:w-[200px]">
        <div className="progress-fill h-full bg-clSky" />
      </div>
      <div className="min-[1180px]:flex min-[1180px]:w-[360px] min-[1180px]:justify-end">
        <p className="text-[12px] font-semibold tracking-[0.12em] text-clWhite">{counter}</p>
      </div>
    </div>
  );
}

function ChapterNav({
  active,
  pinned = false,
  onSelect,
}: {
  active: number;
  pinned?: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="chapter-nav" aria-label="Chapters">
      <ul className="flex flex-col gap-[18px]">
        {chapters.map((chapter, index) => {
          const current = index === active;
          return (
            <li key={chapter.id}>
              <button
                type="button"
                data-index={index}
                className={`chapter-link flex items-center gap-[14px] text-left text-[14px] ${pinned ? "" : current ? "is-current" : ""}`}
                aria-current={current ? "true" : undefined}
                onClick={() => onSelect(index)}
              >
                <span className="marker shrink-0" aria-hidden="true" />
                {chapter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
