"use client";

import { useEffect } from "react";

export default function InnerMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches || root.dataset.motion !== "on") return;

    let cancelled = false;
    let revert = () => {};

    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
          const items = section.querySelectorAll<HTMLElement>("[data-reveal-item]");
          const targets = items.length > 0 ? items : [section];
          gsap.fromTo(
            targets,
            { autoAlpha: 0, y: 12 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true,
              },
            },
          );
        });
      });
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert();
    };
  }, []);

  return null;
}
