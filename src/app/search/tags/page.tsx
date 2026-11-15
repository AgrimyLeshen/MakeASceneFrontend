
import SearchControls from "@/components/search/SearchControls";

import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import { DEFAULT_HEADER_CONFIG } from "@/components/header/header-config-data";
import { testTagResult } from "@/testdata/SearchTestData";
import PageContent from "@/components/shared/PageContent";
import TagList from "@/components/search/TagList";

export default async function SearchTagsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q = "" } = await searchParams;
    const needle = q.trim().toLowerCase();

    // const result = await searchTags(query);
    const result = testTagResult;

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