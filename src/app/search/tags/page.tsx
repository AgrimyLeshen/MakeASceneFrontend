// app/search/events/page.tsx
import SearchControls from "@/components/search/SearchControls";
import EventList from "@/app/oldJsVersion/components/EventList";
import { testPosts } from "@/testdata/EventPostData";
import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import { DEFAULT_HEADER_CONFIG } from "@/components/header/header-config-data";

export default async function SearchEventsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q = "" } = await searchParams;
    const needle = q.trim().toLowerCase();

    const events = needle
        ? testPosts.filter((p) =>
              [p.name, p.location, p.initiativeName, ...p.tags].some((t) =>
                  t.toLowerCase().includes(needle)
              )
          )
        : testPosts;

    return (
        <>
            <HeaderConfigPublisher
                path="/search/tags"
                config={{ ...DEFAULT_HEADER_CONFIG, initialQuery: q }}
            />
            <SearchControls />
            <EventList events={events} />
        </>
    );
}