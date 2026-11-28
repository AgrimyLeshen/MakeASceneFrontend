"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SelectDropdown from "@/components/shared/SelectDropdown"; 
import PageContent from "../shared/PageContent";
import type { SearchControl } from "@/lib/searchControls";


const fieldClass = "h-10 w-full rounded-md bg-textfield px-3 text-[14px] text-text outline-none placeholder:text-text-muted focus:ring-2 focus:ring-[#55d2ff]";

export default function SearchControls({controls}: {controls: SearchControl[]}) {

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


  return (
    <PageContent scrollable gutter={false} hideScrollbar className="py-5">
      <div className="flex items-start gap-6 ">
        {controls.map((c) => {
          /* ---- dropdown ---- */
          if (c.type === "select") {
            return (
              <SelectDropdown
                key={c.param}
                className="w-[180px] flex-none"
                label={c.label}
                value={params.get(c.param) || c.defaultValue}
                options={c.options}
                onChange={(v) => setParam(c.param, v === c.defaultValue ? "" : v)}
              />
            );
          }
 
          const value = params.get(c.param) ?? "";
          return (
            <label key={c.param} className="flex w-[180px] flex-none flex-col gap-1 text-[13px] text-text">
              {c.label}
              <span className="relative flex items-center">
                <input
                  key={value} 
                  type="text"
                  defaultValue={value}
                  placeholder={c.placeholder}
                  className={`${fieldClass} pr-9`}
                  onBlur={(e) => setParam(c.param, e.target.value.trim())}
                  onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
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
          );
        })}
      </div>
    </PageContent>
  );
}