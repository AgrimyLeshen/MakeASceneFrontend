"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectDropdown from "@/components/shared/SelectDropdown"; // adjust path

const sortOptions = [
  { value: "upcoming", label: "Upcoming Events" },
  { value: "newest", label: "Newest" },
];

const fieldClass = "h-10 w-full rounded-md bg-textfield px-3 text-[14px] text-text outline-none placeholder:text-text-muted focus:ring-2 focus:ring-[#55d2ff]";

export default function SearchControls() {

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();


  const setParam = (key: string, value: string) => {

    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}` as Route);
  };

  const sort = params.get("sort") ?? "upcoming";
  const location = params.get("location") ?? "";
  const other = params.get("other") ?? "";


  // text fields commit on Enter / blur; key={value} resets them on back/forward
  const commit = (key: string) => ({
    
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => setParam(key, e.target.value.trim()),
    
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") e.currentTarget.blur();
    },
  });

  return (
    <div className="flex flex-wrap items-start gap-6 px-4 py-4">
      <SelectDropdown
        className="w-[180px]"
        label="Sort by"
        value={sort}
        options={sortOptions}
        onChange={(v) => setParam("sort", v === "upcoming" ? "" : v)}
      />

      <label className="flex w-[180px] flex-col gap-1 text-[13px] text-text">
        Location
        <span className="relative flex items-center">
          <input
            key={location}
            type="text"
            defaultValue={location}
            placeholder="Any Location"
            className={`${fieldClass} pr-9`}
            {...commit("location")}
          />
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-text"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5L21 21" />
          </svg>
        </span>
      </label>

      <label className="flex w-[180px] flex-col gap-1 text-[13px] text-text">
        Something else?
        <input
          key={other}
          type="text"
          defaultValue={other}
          placeholder="Something"
          className={fieldClass}
          {...commit("other")}
        />
      </label>
    </div>
  );
}