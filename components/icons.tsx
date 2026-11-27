type IconProps = { className?: string };

export function IconMenu({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} fill="none" aria-hidden="true">
      <path d="M16.5 5.5L5.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5.5 5.5L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconArrowRight({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowLeft({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconExternal({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} fill="none" aria-hidden="true">
      <path d="M6.41667 6.41667H15.5833V15.5833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.41667 15.5833L15.5833 6.41667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevron({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCheck({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} fill="none" aria-hidden="true">
      <path d="M18.3333 5.5L8.25 15.5833L3.66667 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAlert({ className = "size-[22px]" }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" className={className} fill="none" aria-hidden="true">
      <path d="M20.1667 11C20.1667 16.0626 16.0626 20.1667 11 20.1667C5.93739 20.1667 1.83333 16.0626 1.83333 11C1.83333 5.93739 5.93739 1.83333 11 1.83333C16.0626 1.83333 20.1667 5.93739 20.1667 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 7.33333V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 14.6667H11.0092" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className }: { className: string }) {
  return (
    // The wordmark is a same-origin SVG. next/image refuses SVG while dangerouslyAllowSVG is off.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/d/logo.svg" alt="CommonLife" className={className} />
  );
}
