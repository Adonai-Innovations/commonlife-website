import Link from "next/link";
import { APP_URL, marketingRoutes } from "@/lib/site-links";

const footerLinks = [
  { label: "About Us", href: marketingRoutes.about, external: false },
  { label: "CommonLife Pilot", href: marketingRoutes.pilot, external: false },
  { label: "Contact", href: marketingRoutes.contact, external: false },
  { label: "CommonLife App", href: APP_URL, external: true },
] as const;

const focusDark =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clWhite";

export default function Footer() {
  return (
    <footer className="bg-clDeepOcean text-clWhite" role="contentinfo">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 pb-10 pt-12 min-[1180px]:gap-12 min-[1180px]:px-10 min-[1180px]:pb-12 min-[1180px]:pt-[72px] min-[1440px]:px-[120px]">
        <div className="flex flex-col gap-8 min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:justify-between">
          <Link href={marketingRoutes.home} className={focusDark}>
            {/* eslint-disable-next-line @next/next/no-img-element -- sized SVG wordmark, not a photo */}
            <img
              src="/homepage/logo-wordmark-on-dark.svg"
              alt="CommonLife"
              width={168}
              height={21}
              className="h-[14.92px] w-[124px] min-[1180px]:h-[20.21px] min-[1180px]:w-[168px]"
            />
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-[14px] min-[1180px]:flex-row min-[1180px]:items-center min-[1180px]:gap-9">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      className={`font-inter text-[15px] font-medium text-clWhite hover:underline hover:underline-offset-4 ${focusDark}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`font-inter text-[15px] font-medium text-clWhite hover:underline hover:underline-offset-4 ${focusDark}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="h-px w-full bg-clSky/30" role="separator" />

        <p className="font-inter text-[13px] leading-normal text-clSky min-[1180px]:text-sm">
          © CommonLife, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
