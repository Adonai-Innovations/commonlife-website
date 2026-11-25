import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "onColor";

const variants: Record<Variant, string> = {
  primary: "bg-cl-blue text-cl-white hover:bg-cl-ocean",
  secondary: "border-[1.5px] border-cl-deep-ocean bg-cl-white text-cl-deep-ocean hover:bg-cl-paper",
  onColor: "bg-cl-white text-cl-deep-ocean hover:bg-cl-paper",
};

function classes(variant: Variant, className?: string) {
  return `inline-flex items-center justify-center rounded-full px-6 py-[13px] text-center font-inter text-[15px] font-semibold leading-none ${variants[variant]} ${className ?? ""}`;
}

export function ButtonLink({
  href,
  variant,
  children,
  className,
}: {
  href: string;
  variant: Variant;
  children: ReactNode;
  className?: string;
}) {
  const classNames = classes(variant, className);
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
  className,
  type = "button",
  ...rest
}: {
  variant: Variant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}
