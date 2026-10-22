"use client";

interface SettingsButtonProps {
  isOpen: boolean;
  onClick: () => void;
  controls?: string;
}

export default function FilterSideBar({
  isOpen,
  onClick,
  controls,
}: SettingsButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle filters"
      aria-expanded={isOpen}
      aria-controls={controls}
      className={`flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#cfe3ea] ${
        isOpen ? "bg-white/10" : ""
      }`}
    >
      <img src="settings.svg" className="h-6 w-6" />
    </button>
  );
}