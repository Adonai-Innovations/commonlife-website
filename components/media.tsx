import Image from "next/image";

export function Photo({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : "eager"}
        className="object-cover"
        sizes="(min-width: 1180px) 640px, 100vw"
      />
    </div>
  );
}

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden border-cl-deep-ocean bg-cl-deep-ocean ${className}`}>
      <Image src={src} alt={alt} fill loading="eager" className="object-cover object-top" sizes="260px" />
    </div>
  );
}
