import Link from "next/link";

import { Wordmark } from "@/components/icons";
import { COMMONLIFE_APP_URL, FOOTER_LEGAL } from "@/lib/links";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/commonlife-pilot", label: "CommonLife Pilot" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-cl-paper">
      <div className="hidden flex-col gap-6 px-12 pb-10 pt-6 desktop:flex">
        <div className="h-px w-full bg-cl-deep-ocean" />
        <div className="flex items-center justify-between gap-6">
          <nav aria-label="Footer" className="flex gap-7">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="font-inter text-sm text-cl-deep-ocean">
                {link.label}
              </Link>
            ))}
            <a href={COMMONLIFE_APP_URL} target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-cl-deep-ocean">
              CommonLife App
            </a>
          </nav>
          <div className="flex items-center gap-6">
            <p className="font-inter text-sm text-cl-ocean">{FOOTER_LEGAL}</p>
            <Wordmark className="h-[13px] w-[110px]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6 pb-9 pt-6 desktop:hidden">
        <div className="h-px w-full bg-cl-deep-ocean" />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="font-inter text-sm text-cl-deep-ocean">
              {link.label}
            </Link>
          ))}
          <a href={COMMONLIFE_APP_URL} target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-cl-deep-ocean">
            CommonLife App
          </a>
        </nav>
        <Wordmark className="h-[13px] w-[110px]" />
        <p className="font-inter text-[13px] text-cl-ocean">{FOOTER_LEGAL}</p>
      </div>
    </footer>
  );
}
