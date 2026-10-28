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



/* ------------------------------------------------------------------ */
/* Styles – ported from the old Filter.css (colors = your CSS vars)    */
/* ------------------------------------------------------------------ */

// .filterbox.include / .exclude / .none
const containerBg: Record<Selection, string> = {
  none: "bg-[color:var(--filter-default-bg)]",
  include: "bg-[color:var(--filter-include-bg)]",
  exclude: "bg-[color:var(--filter-exclude-bg)]",
};

// Border of the whole row, only used for subscribed / blocked
const containerBorder: Record<Mark, string> = {
  none: "border-transparent",
  subscribed: "border-[#6f98ab]",
  blocked: "border-[#5b2142]",
};

// .check.active / .deactivated / .default
// The 12px "halo" around the active button was `outline: 12px solid …`.
// A spread box-shadow looks the same, but paints *below* later siblings,
// so the name text stays on top of it.
const includeBtn: Record<Selection, string> = {
  include:
    "bg-[color:var(--filter-include-check-bg)] text-[color:var(--filter-include-check)] shadow-[0_0_0_8px_var(--filter-include-check-border)]",
  exclude:
    "bg-[color:var(--filter-exclude-check-bg)] text-[color:var(--filter-exclude-check)]",
  none: "bg-[color:var(--filter-default-check-bg)] text-[color:var(--filter-default-check)]",
};

// .x.active / .deactivated / .default
const excludeBtn: Record<Selection, string> = {
  exclude:
    "bg-[color:var(--filter-exclude-x-bg)] text-[color:var(--filter-default-x)] shadow-[0_0_0_8px_var(--filter-exclude-x-border)]",
  include:
    "bg-[color:var(--filter-include-x-bg)] text-[color:var(--filter-include-x)]",
  none: "bg-[color:var(--filter-default-x-bg)] text-[color:var(--filter-default-x)]",
};

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60";


// subscribe / block button
const sideButton =
  `relative z-10 flex h-full w-8 shrink-0 cursor-pointer items-center justify-center bg-[#12425b] ${focusRing}`;


// include / exclude button
const mainButton =
  `flex h-[115%] w-9 shrink-0 cursor-pointer items-center justify-center transition-[background-color,color,box-shadow] duration-200 disabled:cursor-not-allowed ${focusRing}`;

/* ------------------------------------------------------------------ */



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
    }
    else {
      const selection: Selection =
        target === "blocked" ? "exclude" : isBlocked ? "none" : state.selection;
      update({ mark: target, selection });
    }
  };


  return (
    <div
      className={`isolate flex h-[38px] w-full min-w-0 items-center overflow-hidden rounded-xl border-2 transition-colors duration-200 hover:brightness-[1.08] ${containerBg[state.selection]} ${containerBorder[state.mark]}`}
    >
      <button
        type="button"
        aria-label={`Subscribe to ${name}`}
        aria-pressed={isSubscribed}
        onClick={() => toggleMark("subscribed")}
        className={`${sideButton} rounded-r-xl ${isSubscribed ? "text-[#a9c1b4]" : "text-[#0b2a3d] hover:text-[#5f8396]"}`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill={isSubscribed ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M6 3h12v18l-6-4.5L6 21z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label={`Include ${name}`}
        aria-pressed={state.selection === "include"}
        disabled={isBlocked}
        onClick={() => toggleSelection("include")}
        className={`${mainButton} -ml-3 rounded-r-[25px] pl-3 ${includeBtn[state.selection]}`}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8.5l3.5 3.5L13 4.5" />
        </svg>
      </button>


      <div className="flex h-full min-w-0 flex-1 items-center justify-center px-1">
        <span className="truncate text-[12px] tracking-[0.2px] text-text" title={name}>
          {name}
        </span>
      </div>


      <button
        type="button"
        aria-label={`Exclude ${name}`}
        aria-pressed={state.selection === "exclude"}
        disabled={isBlocked}
        onClick={() => toggleSelection("exclude")}
        className={`${mainButton} -mr-3 rounded-l-[25px] pr-3 ${excludeBtn[state.selection]}`}
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
        className={`${sideButton} rounded-l-xl ${isBlocked ? "text-[#d6254f]" : "text-[#0b2a3d] hover:text-[#5f8396]"}`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M5.6 5.6l12.8 12.8" />
        </svg>
      </button>
    </div>
  );
}