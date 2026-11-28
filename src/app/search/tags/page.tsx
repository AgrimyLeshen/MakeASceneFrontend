import SearchControls from "@/components/search/SearchControls";
import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import { DEFAULT_HEADER_CONFIG } from "@/components/header/header-config-data";
import PageContent from "@/components/shared/PageContent";
import TagList from "@/components/search/TagList"; 
import { parseSearchParams, searchTags } from "@/lib/SearchAPI";
import { sortTags } from "@/lib/Sorting";
import { SORT, type SearchControl } from "@/lib/searchControls";

const DEFAULT_SORT = SORT.relevance.value;

const controls: SearchControl[] = [
    {
        type: "select",
        param: "sort",
        label: "Sort by",
        defaultValue: DEFAULT_SORT,
        options: [SORT.relevance, SORT.alphabetical],
    },
];

export default async function SearchTagsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
    const query = parseSearchParams(await searchParams);
    const result = sortTags(await searchTags(query), query.sort || DEFAULT_SORT);

    return (
        <>
            <HeaderConfigPublisher path="/search/tags" config={DEFAULT_HEADER_CONFIG} />
            <SearchControls controls={controls} />
            <PageContent>
                <TagList result={result} />
            </PageContent>
        </>
    );
}