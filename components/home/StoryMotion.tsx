"use client";

import { useEffect } from "react";

const NAV_KEYS = new Set(["Tab", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "PageDown", "PageUp", "Home", "End", " "]);

export default function StoryMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      document.documentElement.removeAttribute("data-motion");
      return;
    }

    let cancelled = false;
    let cleanup = () => {};

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled || reduce.matches) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.1,
        touchMultiplier: 1.8,
        autoRaf: false,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const releaseKeyboard = (event: KeyboardEvent) => {
        if (!NAV_KEYS.has(event.key)) return;
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const scrollingPage = target === document.body || target === document.documentElement;
        const control = target.closest("a, button, input, select, textarea, summary, [tabindex]");
        if (event.key === "Tab" || control || !scrollingPage) {
          lenis.scrollTo(window.scrollY, { immediate: true });
        }
      };
      const onFocus = () => {
        lenis.scrollTo(window.scrollY, { immediate: true });
      };
      document.addEventListener("keydown", releaseKeyboard, true);
      document.addEventListener("focusin", onFocus);

      const vertical = window.matchMedia("(min-width: 1180px)");
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-chapter]").forEach((section) => {
          const taller = section.offsetHeight > window.innerHeight + 8;
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              pin: !taller,
              pinSpacing: !taller,
              scrub: 1,
              anticipatePin: 1,
              start: "top top",
              end: "+=135vh",
              invalidateOnRefresh: true,
            },
          });
          section.querySelectorAll<HTMLElement>("[data-story-in]").forEach((node) => {
            const at = Number(node.dataset.beat ?? "0");
            timeline.fromTo(
              node,
              { autoAlpha: 0, y: 60 },
              { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" },
              at,
            );
          });
          const hairline = section.querySelector("[data-hairline]");
          if (hairline) {
            timeline.fromTo(hairline, { scaleX: 0 }, { scaleX: 1, duration: 1.35, ease: "none" }, 0);
          }
          const fill = section.querySelector("[data-fill]");
          if (fill) {
            if (vertical.matches) {
              timeline.fromTo(fill, { scaleY: 0, scaleX: 1 }, { scaleY: 1, scaleX: 1, duration: 1.35, ease: "none" }, 0);
            } else {
              timeline.fromTo(fill, { scaleX: 0, scaleY: 1 }, { scaleX: 1, scaleY: 1, duration: 1.35, ease: "none" }, 0);
            }
          }
          const photo = section.querySelector("[data-parallax]");
          if (photo) {
            timeline.fromTo(photo, { yPercent: 3, scale: 1.02 }, { yPercent: -3, scale: 1.04, duration: 1.35, ease: "none" }, 0);
          }
          timeline.to({}, { duration: 1.35 }, 0);
        });
      });

      const onReduce = () => {
        if (!reduce.matches) return;
        document.documentElement.removeAttribute("data-motion");
        cleanup();
      };
      reduce.addEventListener("change", onReduce);

      cleanup = () => {
        reduce.removeEventListener("change", onReduce);
        document.removeEventListener("keydown", releaseKeyboard, true);
        document.removeEventListener("focusin", onFocus);
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
