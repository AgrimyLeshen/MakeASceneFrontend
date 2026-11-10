"use client";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
  controls?: string;
}

const bar =
  "block h-[2px] w-[22px] rounded-sm bg-[#e4f0f4] transition-all duration-300";

export default function HamburgerSideBar({isOpen, onClick, controls,}: HamburgerButtonProps) {

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      aria-controls={controls}
      className={`flex h-10 w-10 flex-none cursor-pointer flex-col items-center justify-center gap-[5px] rounded-md transition-colors
                hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#cfe3ea] ${
        isOpen ? "bg-white/10" : ""
      }`}
    >
      <span className={`${bar} ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
      <span className={`${bar} ${isOpen ? "opacity-0" : ""}`} />
      <span className={`${bar} ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
    </button>
  );
}