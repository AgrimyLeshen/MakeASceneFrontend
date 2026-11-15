import type { Post } from "@/testdata/EventPostData"; 
import type { Initiative, SiteAccount, Tag, TagSearchResult } from "@/components/search/Search";

/*
 * All backend access for the search pages (server-side, public routes, no token needed).
 *   .env.local:  API_URL=https://api.makeascene.social/v1
 *
 *   Events      GET /event          (search text = `name`)
 *   Initiatives GET /site_accounts  (search text = `q`)     + GET /event?organisers=<id>
 *   Tags        GET /tags           (search text = `query`) + GET /event?included_tags=<id>
 *
 * Every event that leaves this file is already a `Post`, so EventCard / EventList work unchanged.
 */


const API = process.env.API_URL ?? "https://api.makeascene.social/v1";



/* ---------------- URL params -> typed query ---------------- */

export type SearchQuery = {
  q: string;
  sort: string;
  location: string;
  include: string[]; // UI ids: "tag:12" or "loc:<placeId>"
  exclude: string[];
  from: string;
  till: string;
};

type RawParams = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const list = (v: string | string[] | undefined) => one(v).split(",").filter(Boolean);

export function parseSearchParams(sp: RawParams): SearchQuery {
  return {
    q: one(sp.q).trim(),
    sort: one(sp.sort) || "upcoming",
    location: one(sp.location),
    include: list(sp.include),
    exclude: list(sp.exclude),
    from: one(sp.from),
    till: one(sp.till),
  };
}

const tagIds = (ids: string[]) =>
  ids.filter((i) => i.startsWith("tag:")).map((i) => Number(i.slice(4))).filter(Number.isFinite);
const placeIds = (ids: string[]) => ids.filter((i) => i.startsWith("loc:")).map((i) => i.slice(4));

/* ---------------- fetch helper ---------------- */

type Params = Record<string, string | number | boolean | (string | number)[] | undefined>;

async function get<T>(path: string, params: Params = {}): Promise<T> {
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue; // optional params: pass undefined, not ""
    if (Array.isArray(value)) value.forEach((v) => qs.append(key, String(v))); // ?a=1&a=2
    else qs.set(key, String(value));
  }
  const res = await fetch(`${API}${path}${qs.size ? `?${qs}` : ""}`, { next: { revalidate: 30 } });
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

/* ---------------- API event -> Post (the ONE adapter) ---------------- */

type ApiEvent = {
  id: number;
  name: string;
  description: string;
  from: string; // date-time
  till: string;
  tags: number[]; // ids only
  "place-data": unknown;
  layout: number;
  data: unknown[]; // [{ text } | { image } | ...]
  access: string[];
  "owner-name": string;
  "owner-picture": string;
};

// ASSUMPTION: the API's `layout` integer is the index into this list. Confirm with the backend.
const LAYOUTS = ["basic", "ticket", "grafic", "theatric"] as const;
const DEFAULT_COLORS: Post["colors"] = ["#124559", "#598392", "#EFF6E0"];

const TZ = "Europe/Berlin"; // the server runs in UTC, so format explicitly
const fmtDate = (d: Date) =>
  d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: TZ });
const fmtTime = (d: Date) =>
  d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", timeZone: TZ });

// first `{ image }` / `{ text }` entry of the event's data array
const dataItem = (data: unknown[], key: "image" | "text") =>
  data.find((d): d is Record<string, string> => typeof d === "object" && d !== null && key in d)?.[key] ?? "";

// events carry tag ids, Post wants names -> look them up once and remember them
const tagNameCache = new Map<number, string>();
async function tagNames(ids: number[]) {
  const missing = [...new Set(ids)].filter((id) => !tagNameCache.has(id));
  await Promise.all(
    missing.map((id) =>
      get<{ name: string }>(`/tags/${id}`)
        .then((t) => tagNameCache.set(id, t.name))
        .catch(() => undefined)
    )
  );
  return tagNameCache;
}

async function toPosts(events: ApiEvent[], colors: Post["colors"] = DEFAULT_COLORS): Promise<Post[]> {
  const names = await tagNames(events.flatMap((e) => e.tags));

  return events.map((e): Post => {
    const from = new Date(e.from);
    const till = new Date(e.till);
    const place = e["place-data"] as { formatted?: string } | string | null;

    return {
      id: String(e.id),
      layoutType: LAYOUTS[e.layout] ?? "basic",
      name: e.name,
      location: typeof place === "object" && place ? place.formatted ?? "" : "", // ASSUMPTION
      date:
        fmtDate(from) === fmtDate(till)
          ? { type: "single", value: fmtDate(from) }
          : { type: "range", from: fmtDate(from), to: fmtDate(till) },
      time: { type: "range", from: fmtTime(from), to: fmtTime(till) },
      access: e.access.map((name) => ({ name, selected: true })),
      tags: e.tags.map((id) => names.get(id)).filter((n): n is string => !!n),
      image: dataItem(e.data, "image"),
      colors, // events have no colors in the API
      slogan: dataItem(e.data, "text"),
      description: e.description,
      initiativeName: e["owner-name"],
      initiativePP: e["owner-picture"],
      isFavorite: false,
    };
  });
}

const previews = (params: Params, colors?: Post["colors"]) =>
  get<ApiEvent[]>("/event", params)
    .then((events) => toPosts(events, colors))
    .catch(() => [] as Post[]);

/* ---------------- the three searches ---------------- */

export async function searchEvents(q: SearchQuery, page?: number): Promise<Post[]> {
  // free-text "Location" field -> place ids
  const fromText = q.location
    ? await get<{ id: string }[]>("/location", { q: q.location }).catch(() => [])
    : [];

  const events = await get<ApiEvent[]>("/event", {
    name: q.q || undefined,
    included_tags: tagIds(q.include),
    excluded_tags: tagIds(q.exclude),
    "place-id": [...placeIds(q.include), ...fromText.map((l) => l.id)],
    from: q.from || undefined,
    till: q.till || undefined,
    page,
    size: 24,
  });

  // the API has no sort parameter
  if (q.sort === "upcoming") events.sort((a, b) => a.from.localeCompare(b.from));
  return toPosts(events);
}

export async function searchInitiatives(q: SearchQuery): Promise<Initiative[]> {
  const accounts = await get<SiteAccount[]>("/site_accounts", { q: q.q || undefined });

  const events = await Promise.all(
    accounts.map((a) =>
      // the account's own colors style its events
      previews({ organisers: [a.id], size: 2 }, a.colors.length >= 3 ? [a.colors[0], a.colors[1], a.colors[2]] : undefined)
    )
  );
  return accounts.map((a, i) => ({ ...a, events: events[i] }));
}

export async function searchTags(q: SearchQuery): Promise<TagSearchResult> {
  const { tags } = await get<{ tags: { id: number; name: string; parent?: number | null }[] }>("/tags", {
    query: q.q.replace(/^#/, ""), // required by the spec
    autocomplete: false, // required by the spec
  });
  const events = await Promise.all(tags.map((t) => previews({ included_tags: [t.id], size: 3 })));
  const all: Tag[] = tags.map((t, i) => ({ ...t, events: events[i] }));

  // the API has no ranking / "related" list: first 4 = top, rest = related
  return { top: all.slice(0, 4), related: all.slice(4) };
}