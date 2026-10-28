"use client";

import { useId, useState, type ReactNode } from "react";

interface DropdownProps {
  label: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

/**
 * The children stay mounted while closed (only hidden), so state inside
 * them – e.g. the selection of <Filter /> – survives closing and reopening.
 */

export default function Dropdown({ label, defaultOpen = false, children }: DropdownProps) {

    const [open, setOpen] = useState(defaultOpen);
    const panelId = useId();

    return (
        <div className="flex flex-col">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full cursor-pointer items-center justify-between border-b border-white/10 py-1 text-left text-[12px] text-text hover:text-white"
            >
                {label}
                <svg
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 flex-none transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M5 8l5 5 5-5" />
                </svg>
            </button>

            <div
                id={panelId}
                className={`grid transition-[grid-template-rows,visibility] duration-200 ${open ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"}`}
            >
                <div className="min-h-0 overflow-hidden">
                    <div className="flex flex-col gap-2 pt-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}