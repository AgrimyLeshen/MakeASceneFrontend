
import type { Post } from "@/testdata/EventPostData";
import type {
  Initiative,
  SiteAccount,
  Tag,
  TagSearchResult,
} from "@/lib/Search";

// ============================================================
// 1. Configuration
// ============================================================

const API =
  process.env.API_URL ?? "https://api.makeascene.social/v1";

const TZ = "Europe/Berlin";

const LAYOUTS = ["basic", "ticket", "grafic", "theatric"] as const;


// ============================================================
// 2. Search query types and URL parsing
// ============================================================

export type SearchQuery = {
  q: string;
  sort: string;
  location: string;
  include: string[];
  exclude: string[];
  from: string;
  till: string;
};

type RawParams = Record<
  string,
  string | string[] | undefined
>;

const one = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? "";

const list = (value: string | string[] | undefined) =>
  one(value).split(",").filter(Boolean);

export function parseSearchParams(
  params: RawParams
): SearchQuery {
  return {
    q: one(params.q).trim(),
    sort: one(params.sort) || "upcoming",
    location: one(params.location),
    include: list(params.include),
    exclude: list(params.exclude),
    from: one(params.from),
    till: one(params.till),
  };
}

const tagIds = (ids: string[]) =>
  ids
    .filter((id) => id.startsWith("tag:"))
    .map((id) => Number(id.slice(4)))
    .filter(Number.isFinite);

const placeIds = (ids: string[]) =>
  ids
    .filter((id) => id.startsWith("loc:"))
    .map((id) => id.slice(4));

// ============================================================
// 3. API types
// ============================================================

type Params = Record<
  string,
  string | number | boolean | (string | number)[] | undefined
>;

type ApiTag = {
  id: number;
  name: string;
  parent?: number | null;
};

type ApiTagResponse = {
  tags: ApiTag[];
};

type ApiEvent = {
  id: number;
  name: string;
  description: string;
  from: string;
  till: string;
  tags: number[];
  "place-data": unknown;
  layout: number;
  data: unknown[];
  "owner-id": number;
  "owner-name": string;
  repeating: string;
  access: string[];
  "owner-picture": string;
  "detail-data": unknown[];
  collaborators: unknown[];
  visible: boolean;
  colors: string[];
};

// ============================================================
// 4. HTTP utilities
// ============================================================

async function get<T>(
  path: string,
  params: Params = {}
): Promise<T> {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((item) =>
        searchParams.append(key, String(item))
      );
    } else {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  const url = `${API}${path}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    const body = await response.text();

    console.error("API request failed:", {
      url,
      status: response.status,
      body,
    });

    throw new Error(
      `GET ${path} failed: ${response.status}`
    );
  }

  return response.json() as Promise<T>;
}

// ============================================================
// 5. Event transformation: API event -> Post
// ============================================================

const formatDate = (date: Date) =>
  date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TZ,
  });

const formatTime = (date: Date) =>
  date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: TZ,
  });

function getDataItem(
  data: unknown[],
  key: "image" | "text"
): string {
  const item = data.find(
    (entry): entry is Record<string, unknown> =>
      typeof entry === "object" &&
      entry !== null &&
      key in entry
  );

  return typeof item?.[key] === "string"
    ? item[key] as string
    : "";
}

// Cache tag names to avoid repeated API requests.
const tagNameCache = new Map<number, string>();

async function getTagNames(ids: number[]) {
  const missing = [...new Set(ids)].filter(
    (id) => !tagNameCache.has(id)
  );

  await Promise.all(
    missing.map(async (id) => {
      try {
        const tag = await get<ApiTag>(`/tags/${id}`);
        tagNameCache.set(id, tag.name);
      } catch {
        // Keep rendering events even if a tag lookup fails.
      }
    })
  );

  return tagNameCache;
}

async function toPosts(events: ApiEvent[]): Promise<Post[]> {

  const names = await getTagNames(
    events.flatMap((event) => event.tags)
  );

  return events.map((event): Post => {
    const from = new Date(event.from);
    const till = new Date(event.till);

    const place = event["place-data"] as
      | { formatted?: string }
      | string
      | null;

    return {
      id: String(event.id),
      layoutType: LAYOUTS[event.layout] ?? "basic",
      name: event.name,

      location:
        typeof place === "object" && place
          ? place.formatted ?? ""
          : "",

      date:
        formatDate(from) === formatDate(till)
          ? {
              type: "single",
              value: formatDate(from),
            }
          : {
              type: "range",
              from: formatDate(from),
              to: formatDate(till),
            },

      time: {
        type: "range",
        from: formatTime(from),
        to: formatTime(till),
      },

      access: event.access.map((name) => ({
        name,
        selected: true,
      })),

      tags: event.tags
        .map((id) => names.get(id))
        .filter((name): name is string => !!name),

      image: getDataItem(event.data, "image"),
      colors: event.colors as Post["colors"],
      slogan: getDataItem(event.data, "text"),
      description: event.description,
      initiativeName: event["owner-name"],
      initiativePP: event["owner-picture"],
      isFavorite: false,
    };
  });
}

// Fetch event previews. Failures here should not break search results.
async function getPreviews(
  params: Params,
): Promise<Post[]> {
  try {
    const events = await get<ApiEvent[]>("/event", params);
    return await toPosts(events);
  } catch {
    return [];
  }
}

// ============================================================
// 6. Event search
// ============================================================

export async function searchEvents(
  query: SearchQuery,
  page?: number
): Promise<Post[]> {
  const locations = query.location
    ? await get<{ id: string }[]>("/location", {
        q: query.location,
      }).catch(() => [])
    : [];

  const events = await get<ApiEvent[]>("/event", {
    name: query.q || undefined,
    included_tags: tagIds(query.include),
    excluded_tags: tagIds(query.exclude),
    "place-id": [
      ...placeIds(query.include),
      ...locations.map((location) => location.id),
    ],
    from: query.from || undefined,
    till: query.till || undefined,
    page,
    size: 24,
  });

  if (query.sort === "upcoming") {
    events.sort((a, b) =>
      a.from.localeCompare(b.from)
    );
  }

  return toPosts(events);
}

// ============================================================
// 7. Initiative search
// ============================================================

export async function searchInitiatives(
  query: SearchQuery
): Promise<Initiative[]> {
  const accounts = await get<SiteAccount[]>(
    "/site_accounts",
    {
      q: query.q || undefined,
    }
  );

  const events = await Promise.all(
    accounts.map((account) =>
      getPreviews({
        organisers: [account.id],
        size: 2,
      })
    )
  );

  return accounts.map((account, index) => ({
    ...account,
    events: events[index],
  }));
}

// ============================================================
// 8. Tag search
// ============================================================

export async function searchTags(
  query: SearchQuery
): Promise<TagSearchResult> {
  const searchQuery = query.q.replace(/^#/, "").trim();


  // Fetch tags from the backend.
  const response = await get<ApiTagResponse>(
    "/tags",
    {
      query: searchQuery || undefined,
      autocomplete: searchQuery ? false : undefined,
    }

  );

  const tags = response.tags ?? [];

  console.log("TAG SEARCH DEBUG:", {
    searchQuery: searchQuery || "(all tag)",
    returnedTags: tags.length,
    tags,
  });

  // Fetch event previews for each tag.
  const events = await Promise.all(
    tags.map((tag) =>
      getPreviews({
        included_tags: [tag.id],
        size: 3,
      })
    )
  );

  const results: Tag[] = tags.map((tag, index) => ({
    ...tag,
    events: events[index],
  }));

  return {
    top: results.slice(0, 4),
    related: results.slice(4),
  };
}
