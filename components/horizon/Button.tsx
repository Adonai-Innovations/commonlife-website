import Link from "next/link";
import type { ReactNode } from "react";

import { SCHEDULE_DEMO_URL } from "@/lib/links";

type LinkButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  children: ReactNode;
  external?: boolean;
};

export function LinkButton({ href, variant = "outline", children, external = false }: LinkButtonProps) {
  const className = variant === "solid" ? "btn btn-solid" : "btn";
  if (external || href === SCHEDULE_DEMO_URL) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export function SubmitButton({ children, pending }: { children: string; pending?: boolean }) {
  return (
    <button className="btn btn-solid" type="submit" disabled={pending} aria-busy={pending || undefined}>
      {children}
    </button>
  );
}
