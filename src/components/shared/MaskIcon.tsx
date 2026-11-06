import type { StaticImageData } from "next/image";

type MaskIconProps = {
  /** a static import (png/svg) or a URL string */
  src: string | StaticImageData;
  className?: string;
};

/**
 * Used to recolor icons in the colors you want them, it gets used instead of <img/>, etc.
 */

export default function MaskIcon({ src, className = "h-5 w-5" }: MaskIconProps) {
    
  const url = `url(${typeof src === "string" ? src : src.src})`;

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}