import Link from "next/link";

import { SCHEDULE_DEMO_URL } from "@/lib/links";

const LINKS = [
  { label: "About Us", href: "/about" },
  { label: "CommonLife Pilot", href: "/commonlife-pilot" },
  { label: "Contact", href: "/contact" },
] as const;

function AppLink() {
  return (
    <a href={SCHEDULE_DEMO_URL} target="_blank" rel="noopener noreferrer">
      CommonLife App
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-desktop">
        <p className="legal">© CommonLife, Inc. All rights reserved.</p>
        {LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <AppLink />
      </div>
      <div className="footer-mobile">
        {LINKS.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <AppLink />
        <p className="legal">© CommonLife, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
