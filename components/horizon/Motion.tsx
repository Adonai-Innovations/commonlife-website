"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (reduced()) {
      delete root.dataset.motion;
      return;
    }
    root.dataset.motion = "on";

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.3 || (entry.isIntersecting && entry.boundingClientRect.height > window.innerHeight)) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: [0, 0.3] },
    );
    for (const node of nodes) observer.observe(node);

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const photos = document.querySelectorAll<HTMLElement>("[data-parallax]");
      photos.forEach((photo) => {
        const section = photo.closest(".full");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const max = rect.height * 0.08;
        const delta = rect.top + rect.height / 2 - window.innerHeight / 2;
        const shift = Math.max(-max, Math.min(max, -delta * 0.08));
        photo.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (media.matches) {
        delete root.dataset.motion;
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((photo) => {
          photo.style.transform = "";
        });
        nodes.forEach((node) => node.classList.add("is-in"));
      }
    };
    media.addEventListener("change", onChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
