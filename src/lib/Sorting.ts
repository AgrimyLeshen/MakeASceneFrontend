import type { Post } from "@/testdata/EventPostData";
import type { Initiative, TagSearchResult } from "@/lib/Search";

/*
 * Pure sort functions for the three tabs. They work on the result list, so they behave the
 * same with dummy data and backend data (the API has no sort parameter).
 * They never change the input; an unknown sort key returns the list as it is ("relevance").
 */

const collator = new Intl.Collator("de", { sensitivity: "base", numeric: true });
const byName = <T extends { name?: string }>(a: T, b: T) => collator.compare(a.name ?? "", b.name ?? "");

// "post-003" -> 3, "17" -> 17.  There is no created-at field, so a higher id counts as newer.
const numericId = (id: string | number) => Number(String(id).replace(/\D/g, "")) || 0;

/** Start of an event as a timestamp ("18.07.2026" + "10:00"). Broken dates go to the end. */
function startOf(p: Post): number {
  const date = p.date.type === "single" ? p.date.value : p.date.from;
  const time = p.time.type === "single" ? p.time.value : p.time.from;
  const [d, m, y] = date.split(".").map(Number);
  const [h = 0, min = 0] = time.split(":").map(Number);
  const t = new Date(y, m - 1, d, h, min).getTime();
  return Number.isFinite(t) ? t : Infinity;
}

export function sortEvents(events: Post[], sort: string): Post[] {
  const list = [...events];
  switch (sort) {
    case "upcoming":     return list.sort((a, b) => startOf(a) - startOf(b));
    case "newest":       return list.sort((a, b) => numericId(b.id) - numericId(a.id));
    case "alphabetical": return list.sort(byName);
    default:             return list;
  }
}

export function sortInitiatives(initiatives: Initiative[], sort: string): Initiative[] {
  const list = [...initiatives];
  switch (sort) {
    case "newest":       return list.sort((a, b) => numericId(b.id) - numericId(a.id));
    case "alphabetical": return list.sort(byName);
    default:             return list;
  }
}

/** Tags come in two groups; sorting applies inside each group so "top" stays "top". */
export function sortTags(result: TagSearchResult, sort: string): TagSearchResult {
  if (sort !== "alphabetical") return result;
  return {
    top: [...result.top].sort(byName),
    related: [...result.related].sort(byName),
  };
}