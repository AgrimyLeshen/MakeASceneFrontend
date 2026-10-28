"use client";

import { useState } from "react";

export type Selection = "none" | "include" | "exclude";
export type Mark = "none" | "subscribed" | "blocked";

export type FilterState = {
  selection: Selection;
  mark: Mark;
};

export type FilterData = {
  id: string;
  name: string;
  selection?: Selection;
  mark?: Mark;
};

type FilterProps = FilterData & {
  onChange?: (id: string, state: FilterState) => void;
};

// Blocked filters are always excluded. Subscribed filters can be in any selection.
function initialState(selection?: Selection, mark: Mark = "none"): FilterState {
  if (mark === "blocked") return { mark, selection: "exclude" };
  return { mark, selection: selection ?? "none" };
}

const containerBg: Record<Selection, string> = {
  none: "bg-[#134b63]",
  include: "bg-[#10685c]",
  exclude: "bg-[#332b43]",
};

const containerBorder: Record<Mark, string> = {
  none: "border-transparent",
  subscribed: "border-[#6f98ab]",
  blocked: "border-[#5b2142]",
};

const includeBg: Record<Selection, string> = {
  none: "bg-[#1a5b78]",
  include: "bg-[#25b673]",
  exclude: "bg-[#1d1b40]",
};

const excludeBg: Record<Selection, string> = {
  none: "bg-[#1a5b78]",
  include: "bg-[#0f4f4d]",
  exclude: "bg-[#b3204d]",
};

const sideButton =
  "flex w-11 shrink-0 items-center justify-center bg-[#12425b] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60";

const mainButton =
  "flex w-12 shrink-0 items-center justify-center rounded-full text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60 disabled:cursor-not-allowed";

export function Filter({ id, name, selection, mark, onChange }: FilterProps) {
    
  const [state, setState] = useState<FilterState>(() => initialState(selection, mark));

  const update = (next: FilterState) => {
    setState(next);
    onChange?.(id, next);
  };

  const isBlocked = state.mark === "blocked";
  const isSubscribed = state.mark === "subscribed";

  // Include / exclude toggle. Blocked filters are locked to exclude.
  const toggleSelection = (target: "include" | "exclude") => {
    if (isBlocked) return;
    update({ ...state, selection: state.selection === target ? "none" : target });
  };

  // Subscribe / block toggle. Subscribing leaves the selection alone.
  // Blocking forces exclude, and unblocking resets the selection to none.
  const toggleMark = (target: "subscribed" | "blocked") => {
    if (state.mark === target) {
      update({ mark: "none", selection: target === "blocked" ? "none" : state.selection });
    } else {
      const selection: Selection =
        target === "blocked" ? "exclude" : isBlocked ? "none" : state.selection;
      update({ mark: target, selection });
    }
  };

  return (
    <div
      className={`flex h-12 items-stretch overflow-hidden rounded-xl border-2 transition-colors ${containerBg[state.selection]} ${containerBorder[state.mark]}`}
    >
      <button
        type="button"
        aria-label={`Subscribe to ${name}`}
        aria-pressed={isSubscribed}
        onClick={() => toggleMark("subscribed")}
        className={`${sideButton} ${isSubscribed ? "text-[#a9c1b4]" : "text-[#0b2a3d] hover:text-[#5f8396]"}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill={isSubscribed ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M6 3h12v18l-6-4.5L6 21z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={`Include ${name}`}
        aria-pressed={state.selection === "include"}
        disabled={isBlocked}
        onClick={() => toggleSelection("include")}
        className={`${mainButton} ${includeBg[state.selection]}`}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8.5l3.5 3.5L13 4.5" />
        </svg>
      </button>

      <span className="flex min-w-0 flex-1 items-center justify-center truncate px-2 text-sm text-white">
        {name}
      </span>

      <button
        type="button"
        aria-label={`Exclude ${name}`}
        aria-pressed={state.selection === "exclude"}
        disabled={isBlocked}
        onClick={() => toggleSelection("exclude")}
        className={`${mainButton} ${excludeBg[state.selection]} ${state.selection === "include" ? "text-[#6b8a90]" : ""}`}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={`Block ${name}`}
        aria-pressed={isBlocked}
        onClick={() => toggleMark("blocked")}
        className={`${sideButton} ${isBlocked ? "text-[#d6254f]" : "text-[#0b2a3d] hover:text-[#5f8396]"}`}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M5.6 5.6l12.8 12.8" />
        </svg>
      </button>
    </div>
  );
}