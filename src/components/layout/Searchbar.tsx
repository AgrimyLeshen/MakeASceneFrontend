"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({value, onChange, onSubmit, placeholder = "Search", className = "",}: SearchBarProps) {

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
      className={`relative flex items-center ${className}`}
    >
      <img src="search.svg" className="pointer-events-none absolute left-3 h-[18px] w-[18px] text-[#01161E]" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full h-7 rounded-full bg-[#EFF6E0] py-2 pl-10 pr-4 text-sm text-[#01161E] outline-none placeholder:text-[#01161E] focus:ring-2 focus:ring-[#55d2ff]"
      />
    </form>
  );
}