import Link from "next/link";

import Wordmark from "@/components/Wordmark";
import { FOOTER_LEGAL, SCHEDULE_DEMO_URL } from "@/lib/links";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/commonlife-pilot", label: "CommonLife Pilot" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const linkClass = `py-2 font-inter text-[15px] font-medium leading-5 ${dark ? "text-cl-white" : "text-cl-deep-ocean"}`;

  return (
    <footer className={dark ? "border-t border-cl-ocean bg-cl-deep-ocean text-cl-white" : "border-t border-cl-deep-ocean bg-cl-paper text-cl-deep-ocean"}>
      <div className="mx-auto flex flex-col gap-7 px-5 py-12 desktop:px-12">
        <Wordmark className="h-[19px] w-[160px]" />
        <nav aria-label="Footer" className="flex max-w-full flex-wrap gap-x-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <a href={SCHEDULE_DEMO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            CommonLife App
          </a>
          <span className={linkClass}>Privacy Policy</span>
        </nav>
        <p className={`font-inter text-[13px] leading-5 ${dark ? "text-cl-sky" : "text-cl-ocean"}`}>{FOOTER_LEGAL}</p>
      </div>
    </footer>
  );
}
