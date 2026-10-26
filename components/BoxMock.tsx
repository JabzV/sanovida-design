import type { CSSProperties } from "react";
import { dosages, type DosageId } from "@/lib/catalog";

/**
 * Stand-in drawing of a SanoVida box, shown until the product render (B1–B5,
 * C1–C3) is supplied. Keeps the dosage colour coding legible in the meantime.
 */
export function BoxMock({ dosage, size = 210, className = "" }: { dosage: DosageId; size?: number; className?: string }) {
  const d = dosages.find((x) => x.id === dosage)!;
  return (
    <div className={`boxmock ${className}`} style={{ "--c": d.color, "--w": `${size}px` } as CSSProperties} aria-hidden="true">
      <div className="boxmock__top" />
      <div className="boxmock__side" />
      <div className="boxmock__face">
        <span className="boxmock__logo" />
        <span className="boxmock__brand">SanoVida</span>
        <span className="boxmock__name">Orforglipron</span>
        <span className="boxmock__mg">{d.id} mg</span>
        <span className="boxmock__count">30 tablets</span>
        <svg className="boxmock__wave" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path d="M0 18 C 25 4, 45 30, 70 16 S 100 8, 100 8 V40 H0Z" fill="var(--c)" opacity=".28" />
          <path d="M0 26 C 30 12, 50 36, 75 22 S 100 18, 100 18 V40 H0Z" fill="var(--c)" />
        </svg>
      </div>
    </div>
  );
}

/** A small group of boxes for the package placeholders. */
export function BoxStack({ count, size = 96 }: { count: number; size?: number }) {
  const shown = Math.min(count, 3);
  const order: DosageId[] = ["0.8", "9", "5.5"];
  return (
    <div className={`boxstack boxstack--${shown}`} aria-hidden="true">
      {order.slice(0, shown).map((id) => (
        <BoxMock key={id} dosage={id} size={size} />
      ))}
      {count > 3 && <span className="boxstack__more">×{count}</span>}
    </div>
  );
}
