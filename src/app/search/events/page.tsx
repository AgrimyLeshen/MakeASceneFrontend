// app/search/events/page.tsx
import SearchControls from "@/components/search/SearchControls";
import EventList from "@/app/oldJsVersion/components/EventList";
import { testPosts } from "@/testdata/EventPostData";

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
            <SearchControls />
            <EventList events={events} />
        </>
    );
}