"use client";

import MaskIcon from "../shared/MaskIcon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({value, onChange, onSubmit, onFocus, placeholder = "Search", className = "",}: SearchBarProps) {

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={`relative flex items-center ${className}`}
    >
      <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-text-search">
        <MaskIcon src="/search.svg" />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full h-7 rounded-full bg-text py-2 pl-10 pr-4 text-sm text-[#01161E] outline-none placeholder:text-[#01161E] focus:ring-2 focus:ring-[#55d2ff]"
      />
    </form>
  );
}