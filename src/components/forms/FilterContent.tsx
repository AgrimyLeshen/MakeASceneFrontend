"use client";

import { useState, type ReactNode } from "react";
import FilterList from "./FilterList";
import type { FilterData, FilterState } from "./Filter";
import Dropdown from "./Dropdown";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

/** Everything the sidebar reports upwards. */
export interface FilterValues {
  /** selection + mark per filter id (only filters the user touched) */
  filters: Record<string, FilterState>;
  otherLocations: string;
  otherTags: string;
  from: string; // yyyy-mm-dd 
  till: string;
}

interface FilterContentProps {
  /** Initial data per list. Marks decide the look: use mark "subscribed" / "blocked". */
  subscribedTags?: FilterData[];
  locations?: FilterData[];
  whatTags?: FilterData[];
  blockedTags?: FilterData[];
  onChange?: (values: FilterValues) => void;
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */


/** Centered section title with the thin line underneath */
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="border-b border-white/10 pb-1 text-center text-[15px] font-semibold text-text">
        {title}
      </h3>
      {children}
    </section>
  );
}


const inputBase = "w-full rounded-md bg-black/30 px-2 py-1.5 text-[11px] text-text focus:outline focus:outline-1 focus:outline-[#cfe3ea]";


function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`${inputBase} placeholder:text-text-muted`}
    />
  );
}


function DateInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <input
      type="date"
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} [color-scheme:dark]`}
    />
  );
}

/* ------------------------------------------------------------------ */
/* FilterContent                                                       */
/* ------------------------------------------------------------------ */

export default function FilterContent({subscribedTags = [],locations = [],whatTags = [],blockedTags = [],onChange}: FilterContentProps) {

    const [values, setValues] = useState<FilterValues>({
        filters: {},
        otherLocations: "",
        otherTags: "",
        from: "",
        till: "",
    });

    const patch = (partial: Partial<FilterValues>) =>
        setValues((prev) => {
        const next = { ...prev, ...partial };
        onChange?.(next);
        return next;
        });

    // Passed to every FilterList – merges the changed filter into the map.
    const handleFilterChange = (id: string, state: FilterState) =>
        setValues((prev) => {
        const next = { ...prev, filters: { ...prev.filters, [id]: state } };
        onChange?.(next);
        return next;
        });

    return (
        <div className="flex flex-col gap-6 text-text">
            <h2 className="text-xl font-bold">Filter</h2>

            {/* ---------------- Subscribed ---------------- */}
            <Section title="Subscribed">
                <Dropdown label="Initiatives" />
                <Dropdown label="Tags" defaultOpen>
                    <FilterList filters={subscribedTags} onFilterChange={handleFilterChange} />
                </Dropdown>
            </Section>

            {/* ---------------- Where? ---------------- */}
            <Section title="What?">
                <Dropdown label="Tags" defaultOpen>
                    <FilterList filters={whatTags} onFilterChange={handleFilterChange} />
                </Dropdown>
                <Dropdown label="Details" />
            </Section>

            {/* ---------------- When? ---------------- */}
            <Section title="When?">
                <Dropdown label="Time Interval" defaultOpen />
                <DateInput label="From" value={values.from} onChange={(v) => patch({ from: v })} />
                        <span className="text-[13px] text-text-muted">till</span>
                <DateInput label="Till" value={values.till} onChange={(v) => patch({ till: v })} />
            </Section>

            {/* ---------------- What? ---------------- */}
        

            {/* ---------------- Blocked ---------------- */}
            <Section title="Blocked">
                <Dropdown label="Initiatives" />
                <Dropdown label="Tags" defaultOpen>
                    <FilterList filters={blockedTags} onFilterChange={handleFilterChange} />
                </Dropdown>
            </Section>
        </div>
    );
}