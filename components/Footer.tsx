import Link from "next/link";

const footerLinks = [
  { label: "About CommonLife", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-lightBerry" role="contentinfo">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 py-12 md:py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <p className="font-heading font-bold text-white text-xl">CommonLife</p>
            <p className="text-sm mt-1 max-w-xs">
              Where Faith and Understanding Meet Clarity
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://commonlife.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded"
                >
                  CommonLife App ↗
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-brand-lightBerry/70">
          © 2025 CommonLife, Inc. — All rights reserved. CommonLife® is a registered trademark.
        </div>
      </div>
    </footer>
  );
}
