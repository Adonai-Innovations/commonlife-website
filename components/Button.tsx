import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary-dark" | "secondary-light" | "on-color";

const styles: Record<Variant, string> = {
  primary: "h-12 border border-transparent bg-cl-blue text-cl-white",
  "secondary-dark": "h-[50px] border border-cl-white bg-transparent text-cl-white",
  "secondary-light": "h-[50px] border border-cl-deep-ocean bg-transparent text-cl-deep-ocean",
  "on-color": "h-12 border border-transparent bg-cl-white text-cl-deep-ocean",
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 font-inter text-[15px] font-medium leading-5";

export function ButtonLink({
  href,
  variant,
  children,
  className = "",
}: {
  href: string;
  variant: Variant;
  children: ReactNode;
  className?: string;
}) {
  const classNames = `${base} ${styles[variant]} ${className}`;
  if (href.startsWith("http")) {
    return (
      <a href={href} className={classNames} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  );
}

export function ButtonButton({
  variant,
  children,
  className = "",
  type = "button",
  disabled,
  onClick,
}: {
  variant: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles[variant]} disabled:opacity-70 ${className}`}>
      {children}
    </button>
  );
}
