import SearchControls from "@/components/search/SearchControls";
import EventList from "@/components/events/EventList";
import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import { DEFAULT_HEADER_CONFIG } from "@/components/header/header-config-data";
import { parseSearchParams, searchEvents } from "@/lib/SearchAPI";
import { sortEvents } from "@/lib/Sorting";
import { SORT, type SearchControl } from "@/lib/searchControls";

const DEFAULT_SORT = SORT.upcoming.value;

const controls: SearchControl[] = [
    {
        type: "select",
        param: "sort",
        label: "Sort by",
        defaultValue: DEFAULT_SORT,
        options: [SORT.upcoming, SORT.newest, SORT.alphabetical],
    },
    { type: "text", param: "location", label: "Location", placeholder: "Any Location" },
];

export default async function SearchEventsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const query = parseSearchParams(await searchParams);
    const events = sortEvents(await searchEvents(query), query.sort || DEFAULT_SORT);

    return (
        <>
            <HeaderConfigPublisher path="/search/events" config={DEFAULT_HEADER_CONFIG} />
            <SearchControls controls={controls} />
            <EventList events={events} />
        </>
    );
}