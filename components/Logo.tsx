"use client";

import Image from "next/image";
import { images } from "@/lib/catalog";
import { useSite } from "./SiteContext";

interface LogoProps {
  className?: string;
  /** "light" is the full colour lockup on white; "dark" is the white mark with light words, for the footer. */
  variant?: "light" | "dark";
}

/** SanoVida lockup. Uses the supplied logo files (G1, G2) when present, else the drawn wordmark. */
export function Logo({ className = "", variant = "light" }: LogoProps) {
  const { available, t } = useSite();

  if (variant === "light" && available.has("G1")) {
    return (
      <span className={`logo ${className}`}>
        <Image src={`/images/${images.G1.file}`} alt="SanoVida" width={images.G1.w} height={images.G1.h} className="logo__img" sizes="640px" quality={90} priority />
      </span>
    );
  }

  const mark =
    variant === "dark" && available.has("G2") ? (
      <Image src={`/images/${images.G2.file}`} alt="" width={images.G2.w} height={images.G2.h} className="logo__markimg" sizes="160px" quality={90} />
    ) : (
      <LogoMark />
    );

  return (
    <span className={`logo ${className}`}>
      {mark}
      <span className="logo__words">
        <span className="logo__name">
          Sano<span>Vida</span>
        </span>
        <span className="logo__tag">{t.brandTagline}</span>
      </span>
    </span>
  );
}

/** The circular mark alone: a woman's profile in a pink ring with green leaves. */
export function LogoMark({ className = "logo__mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="none" stroke="var(--rose)" strokeWidth="1.8" />
      <path d="M23 12.5c-3.6 0-6.2 2.6-6.2 6.2 0 2.4 1.1 3.6 1.1 5.2 0 1.4-.7 2.1-.7 3.6 0 2.8 2 4.6 2 7.5h7.2c0-2.3 1.9-3.3 3.2-5.4 1-1.6.4-3.1 1.6-3.9.8-.5 1.7-.6 1.7-1.5 0-.7-1.2-1.3-1.2-2.3 0-.9.9-1.4.9-2.9 0-3.6-5.3-6.5-9.6-6.5Z" fill="none" stroke="var(--rose)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M30 34c1-5.5 5.2-9.2 11.5-10-.6 5.8-5 9.8-11.5 10Z" fill="var(--leaf)" />
      <path d="M31.5 33c2.3-3 5-5.2 8.3-6.6" fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
