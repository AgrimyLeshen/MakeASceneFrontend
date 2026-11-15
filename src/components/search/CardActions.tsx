"use client";

import { useState } from "react";
import MaskIcon from "@/components/shared/MaskIcon";


export function FavoriteButton({initial, label, onChange,}: {
  initial: boolean;
  label: string;
  onChange?: (isFav: boolean) => void; 
}) {
  
  const [fav, setFav] = useState(initial);

  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
      onClick={() => {
        setFav(!fav);
        onChange?.(!fav);
      }}
      className={`relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center ${
        fav ? "text-notification" : "text-event-header-icons hover:text-icons-dark"
      }`}
    >
      <MaskIcon src={fav ? "/heartFilled.svg" : "/heartOutline.svg"} />
    </button>
  );
}

export function MoreButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={`More options for ${label}`}
      className="relative z-10 flex h-7 w-7 cursor-pointer items-center justify-center text-[18px] leading-none text-event-header-icons hover:text-icons-dark"
    >
      ⋯
    </button>
  );
}