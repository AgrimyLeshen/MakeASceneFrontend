
import SearchControls from "@/components/search/SearchControls";

import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import { DEFAULT_HEADER_CONFIG } from "@/components/header/header-config-data";
import { testTagResult } from "@/testdata/SearchTestData";
import PageContent from "@/components/shared/PageContent";
import type { Tag } from "@/components/search/Search";
import { parseSearchParams, searchTags } from "@/lib/SearchAPI";
import TagList from "@/components/search/TagList";

export default async function SearchTagsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const query = parseSearchParams(await searchParams);
    const { q = "" } = await searchParams;
    const needle = query.q.replace(/^#/, "").toLowerCase();
    const matches = (t: Tag) => t.name.toLowerCase().includes(needle);

    // const result = await searchTags(query);
    const result = {
        top: testTagResult.top.filter(matches),
        related: testTagResult.related.filter(matches),
    };

    return (
        <>
            <HeaderConfigPublisher
                path="/search/tags"
                config={{ ...DEFAULT_HEADER_CONFIG, initialQuery: q }}
            />
            <PageContent>
                <TagList result={result}/>
            </PageContent>
        </>
    );
}