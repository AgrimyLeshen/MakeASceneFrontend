"use client";

import { useId, useState } from "react";



/* Dates are handled as "yyyy-mm-dd" strings (same format as <input type="date">),
   so min/max comparisons are plain string comparisons and there are no timezone bugs. */

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;


const parse = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return { y, m: m - 1, d };
};


const formatDE = (iso: string) => {
    const { y, m, d } = parse(iso);
    return `${pad(d)}.${pad(m + 1)}.${y}`;
};


interface DateFieldProps {
    label: string;
    value: string;
    onChange: (v: string) => void;
    min?: string;
    max?: string;
    invalid?: boolean;
}


export default function DateField({ label, value, onChange, min, max, invalid = false }: DateFieldProps) {

    const [open, setOpen] = useState(false);
    const panelId = useId();


    const [view, setView] = useState(() => {
        if (value) {
            const { y, m } = parse(value);
            return { y, m };
        }
        const now = new Date();
        return { y: now.getFullYear(), m: now.getMonth() };
    });

    
    const shiftMonth = (delta: number) =>
        setView(({ y, m }) => {
            const d = new Date(y, m + delta, 1);
            return { y: d.getFullYear(), m: d.getMonth() };
        });

    const toggle = () => {
        if (!open && value) setView(parse(value)); 
        setOpen((o) => !o);
    };

    //to show monday as first day
    const offset = (new Date(view.y, view.m, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
    const cells: (number | null)[] = [
        ...Array<null>(offset).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];


    const monthLabel = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(
        new Date(view.y, view.m, 1)
    );


    const weekdays = Array.from({ length: 7 }, (_, i) =>
        new Intl.DateTimeFormat(undefined, { weekday: "narrow" }).format(new Date(2024, 0, 1 + i))
    );

    const now = new Date();
    const todayISO = toISO(now.getFullYear(), now.getMonth(), now.getDate());


    return (
        <div className="flex flex-col gap-1" onKeyDown={(e) => e.key === "Escape" && setOpen(false)} >
            <button
                type="button"
                aria-label={label}
                aria-expanded={open}
                aria-controls={panelId}
                aria-invalid={invalid}
                onClick={toggle}
                className={`flex w-full cursor-pointer items-center justify-between rounded-md bg-black/30 px-2 py-1.5 text-left text-[11px] focus:outline focus:outline-1 focus:outline-[#cfe3ea] 
                ${invalid ? "outline outline-1 outline-notification" : ""} ${value ? "text-text" : "text-text-muted"}`}
            >
                {value ? formatDE(value) : "dd.mm.yyyy"}
                <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
            </button>

            {/* In normal flow inside the sidebar – can never be clipped or pushed off-screen */}
            {open && (
                <div id={panelId} className="rounded-md bg-black/30 p-2">
                    <div className="mb-1 flex items-center justify-between">
                        <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded hover:bg-white/10">
                            <svg viewBox="0 0 20 20" className="h-4 w-4 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                        </button>

                        <span className="text-[12px] font-semibold capitalize text-text">{monthLabel}</span>

                        <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className="flex h-7 w-7 cursor-pointer items-center justify-center rounded hover:bg-white/10">
                            <svg viewBox="0 0 20 20" className="h-4 w-4 -rotate-90" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
                        {weekdays.map((w, i) => (
                        <span key={i} className="py-1 text-text-muted">{w}</span>
                        ))}

                        {cells.map((day, i) => {
                        if (day === null) return <span key={`e${i}`} />;
                        const iso = toISO(view.y, view.m, day);
                        const disabled = (!!min && iso < min) || (!!max && iso > max);
                        const selected = iso === value;
                        return (
                            <button
                                key={iso}
                                type="button"
                                disabled={disabled}
                                aria-pressed={selected}
                                onClick={() => {
                                    onChange(iso);
                                    setOpen(false);
                                }}
                                className={`h-7 cursor-pointer rounded text-text transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${selected? "bg-[#25b673] font-semibold text-white"
                                : "hover:bg-white/10"
                                } ${iso === todayISO && !selected ? "ring-1 ring-inset ring-white/40" : ""}`}
                            >
                                {day}
                            </button>
                        );
                        })}
                    </div>

                    {value && (
                        <button
                        type="button"
                        onClick={() => {
                            onChange("");
                            setOpen(false);
                        }}
                        className="mt-2 w-full cursor-pointer rounded py-1 text-[11px] text-text-muted hover:bg-white/10 hover:text-white"
                        >
                        Clear
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}