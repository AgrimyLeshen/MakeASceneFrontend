"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type SelectOption = { value: string; label: string };

interface SelectDropdownProps {

    label?: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    className?: string;
}

type Position = { top: number; left: number; width: number };


export default function SelectDropdown({label,value,options,onChange,className = "",}: SelectDropdownProps) {

    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState<Position | null>(null);

    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const id = useId();

    const current = options.find((o) => o.value === value) ?? options[0];


    const openPanel = () => {
        const r = buttonRef.current?.getBoundingClientRect();
        if (!r) return;

        setPos({ top: r.bottom + 4, left: r.left, width: r.width });
        setOpen(true);
    };


    useEffect(() => {
        if (!open) return;
 
        const onPointerDown = (e: PointerEvent) => {
            const t = e.target as Node;
            if (!rootRef.current?.contains(t) && !panelRef.current?.contains(t)) setOpen(false);
        };

        const onScroll = (e: Event) => {
            if (panelRef.current?.contains(e.target as Node)) return; // scrolling inside the list is fine
            setOpen(false);
        };

        const onResize = () => setOpen(false);
    
        document.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("scroll", onScroll, true); 
        window.addEventListener("resize", onResize);

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("scroll", onScroll, true);
            window.removeEventListener("resize", onResize);
        };

    }, [open]);


    const moveFocus = (dir: 1 | -1) => {
        const items = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []);

        if (!items.length) return;

        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = i === -1 ? (dir === 1 ? 0 : items.length - 1) : (i + dir + items.length) % items.length;

        items[next].focus();
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape" && open) {
            setOpen(false);
            buttonRef.current?.focus();
        }
        else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) setOpen(true);
            else moveFocus(e.key === "ArrowDown" ? 1 : -1);
        }
    };

    return (
        <div ref={rootRef} onKeyDown={onKeyDown} className={`relative flex flex-col gap-1 ${className}`}>
            {label && (
                <label htmlFor={`${id}-button`} className="text-[13px] text-text">
                {label}
                </label>
            )}

            <button
                ref={buttonRef}
                id={`${id}-button`}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={`${id}-list`}
                onClick={() => (open ? setOpen(false) : openPanel())}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-md bg-textfield px-3 text-left text-[14px] text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#55d2ff]"
            >
                <span className="truncate">{current?.label}</span>
                <svg
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 flex-none transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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

            {open &&
            pos &&
            createPortal(
                <div
                    ref={panelRef}
                    id={`${id}-list`}
                    role="listbox"
                    aria-label={label}
                    style={{ position: "fixed", top: pos.top, left: pos.left, width: pos.width }}
                    className="z-[1000] overflow-hidden rounded-md bg-textfield shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                >
                    {options.map((o) => {
                        const selected = o.value === value;
                        return (
                            <button
                                key={o.value}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                onClick={() => {
                                    onChange(o.value);
                                    setOpen(false);
                                    buttonRef.current?.focus();
                                }}
                                className={`flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-[14px] hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none ${
                                    selected ? "font-semibold text-text" : "text-text-muted"
                                }`}
                            >
                                <span className="truncate">{o.label}</span>
                                {selected && (
                                    <svg viewBox="0 0 16 16" className="h-4 w-4 flex-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M3 8.5l3.5 3.5L13 4.5" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>,
                document.body
            )}

        </div>
    );
}