"use client";

import { useState, type ReactNode } from "react";
import FilterList from "./FilterList";
import type { FilterData, FilterState } from "./Filter";
import Dropdown from "@/components/shared/Dropdown";
import DateField from "@/components/shared/DataField";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type SectionId = "subscribed" | "where" | "when" | "what" | "blocked";

export const ALL_SECTIONS: SectionId[] = ["subscribed", "where", "when", "what", "blocked"];


export interface FilterValues {
  /** selection + mark per filter id (only filters the user touched) */
  filters: Record<string, FilterState>;
  otherLocations: string;
  otherTags: string;
  from: string; // yyyy-mm-dd 
  till: string;
}

export interface FilterContentProps {
  /** Initial data per list. Marks decide the look: use mark "subscribed" / "blocked". */
  subscribedTags?: FilterData[];
  locations?: FilterData[];
  whatTags?: FilterData[];
  blockedTags?: FilterData[];
  sections?: SectionId[];
  onChange?: (values: FilterValues) => void;
}

export const isDateRangeValid = (from: string, till: string) =>
  !from || !till || from <= till;


/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */


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


function TextInput({value, onChange, placeholder}: {
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



/* ------------------------------------------------------------------ */
/* FilterContent                                                       */
/* ------------------------------------------------------------------ */

export default function FilterContent({subscribedTags = [],locations = [],whatTags = [],blockedTags = [],onChange , sections = ALL_SECTIONS}: FilterContentProps) {

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

    
    const rangeInvalid = !isDateRangeValid(values.from, values.till);

    const show = (id: SectionId) => sections.includes(id);
      

    return (
        <div className="flex flex-col gap-6 text-text">
            <h2 className="text-xl font-bold">Filter</h2>
 
            {/* ---------------- Subscribed ---------------- */}
            {show("subscribed") && (
                <Section title="Subscribed">
                    <Dropdown label="Initiatives" />
                    <Dropdown label="Tags" defaultOpen>
                        <FilterList filters={subscribedTags} onFilterChange={handleFilterChange} />
                    </Dropdown>
                </Section>
            )}
 
            {/* ---------------- Where? ---------------- */}
            {show("where") && (
                <Section title="Where?">
                    <Dropdown label="Tags" defaultOpen>
                        <FilterList filters={locations} onFilterChange={handleFilterChange} />
                    </Dropdown>
                    <Dropdown label="Details" />
                    <TextInput
                      value={values.otherLocations}
                      onChange={(v) => patch({ otherLocations: v })}
                      placeholder="Other locations"
                    />
                </Section>
            )}
 
            {/* ---------------- When? ---------------- */}
            {show("when") && (
                <Section title="When?">
                    <Dropdown label="Time Interval" defaultOpen />
                    <DateField label="From"
                      value={values.from}
                      max={values.till || undefined}
                      invalid={rangeInvalid}
                      onChange={(v) => patch({ from: v })} 
                    />
                    <span className="text-[13px] text-text-muted">till</span>
                    <DateField label="Till"
                      value={values.till}
                      min={values.from || undefined}
                      invalid={rangeInvalid}
                      onChange={(v) => patch({ till: v })}
                    />
                    {rangeInvalid && (
                        <p role="alert" className="text-[11px] text-notification">
                            The start date must not be after the end date.
                        </p>
                    )}
                </Section>
            )}
 
            {/* ---------------- What? ---------------- */}
            {show("what") && (
                <Section title="What?">
                    <Dropdown label="Tags" defaultOpen>
                        <FilterList filters={whatTags} onFilterChange={handleFilterChange} />
                    </Dropdown>
                    <Dropdown label="Details" />
                    <TextInput
                      value={values.otherTags}
                      onChange={(v) => patch({ otherTags: v })}
                      placeholder="Other Tagd"
                    />
                </Section>
            )}
 
            {/* ---------------- Blocked ---------------- */}
            {show("blocked") && (
                <Section title="Blocked">
                    <Dropdown label="Initiatives" />
                    <Dropdown label="Tags" defaultOpen>
                        <FilterList filters={blockedTags} onFilterChange={handleFilterChange} />
                    </Dropdown>
                </Section>
            )}
        </div>
    );

}