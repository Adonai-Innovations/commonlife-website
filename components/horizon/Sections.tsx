import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

const PHOTOS = {
  "light-rays": "/images/horizon/light-rays.jpg",
  pew: "/images/horizon/pew.jpg",
  "open-bible": "/images/horizon/open-bible.jpg",
  "bibles-group": "/images/horizon/bibles-group.jpg",
  "coffee-bible": "/images/horizon/coffee-bible.jpg",
} as const;

export function FullSection({
  image,
  side = "left",
  copyWidth = 900,
  priority = false,
  hero = false,
  children,
}: {
  image: keyof typeof PHOTOS;
  side?: "left" | "right";
  copyWidth?: number;
  priority?: boolean;
  hero?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="full" data-align={side === "right" ? "end" : "start"} data-hero={hero ? "true" : undefined} data-photo={image}>
      <div className="full-media" aria-hidden="true">
        <div className="full-photo" data-parallax="" data-settle={priority ? "true" : "false"}>
          <Image src={PHOTOS[image]} alt="" fill priority={priority} sizes="100vw" />
        </div>
        <div className="scrim" data-side={side} />
      </div>
      <div className="full-copy" style={{ "--copy": `${copyWidth}px` } as CSSProperties}>
        {children}
      </div>
    </section>
  );
}

export function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="spec-row">
      <p className="spec-label">{label}</p>
      <p className="spec-value">{value}</p>
    </div>
  );
}

export function SpecSheet({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="spec">
      {rows.map((row) => (
        <SpecRow key={row.label} label={row.label} value={row.value} />
      ))}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <div className="check-list">
      {items.map((item) => (
        <div className="check-row" key={item}>
          <span className="tick" aria-hidden="true" />
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export function Phone() {
  return (
    <div className="phone-wrap">
      <div className="phone">
        <Image src="/images/horizon/sermon.jpg" alt="" fill sizes="330px" priority />
      </div>
    </div>
  );
}

export function Reveal({ index, children, className }: { index: number; children: ReactNode; className?: string }) {
  return (
    <div className={className} data-reveal="" data-contrast="white" style={{ "--stagger": index } as CSSProperties}>
      {children}
    </div>
  );
}
