import SearchControls from "@/components/search/SearchControls";
import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import { DEFAULT_HEADER_CONFIG } from "@/components/header/header-config-data";
import PageContent from "@/components/shared/PageContent";
import InitiativeList from "@/components/search/InitiativeList";
import { parseSearchParams, searchInitiatives } from "@/lib/SearchAPI";
import { sortInitiatives } from "@/lib/Sorting";
import { SORT, type SearchControl } from "@/lib/searchControls";

const DEFAULT_SORT = SORT.alphabetical.value;

const controls: SearchControl[] = [
    {
        type: "select",
        param: "sort",
        label: "Sort by",
        defaultValue: DEFAULT_SORT,
        options: [SORT.alphabetical, SORT.newest],
    },
];

export default async function SearchInitiativePage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const query = parseSearchParams(await searchParams);
    const initiatives = sortInitiatives(await searchInitiatives(query), query.sort || DEFAULT_SORT);

    return (
        <>
            <HeaderConfigPublisher path="/search/initiatives" config={DEFAULT_HEADER_CONFIG} />
            <SearchControls controls={controls} />
            <PageContent>
                <InitiativeList initiatives={initiatives} />
            </PageContent>
        </>
    );
}