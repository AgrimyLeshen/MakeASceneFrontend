
import SearchControls from "@/components/search/SearchControls";
import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import { DEFAULT_HEADER_CONFIG } from "@/components/header/header-config-data";
import PageContent from "@/components/shared/PageContent";
import InitiativeList from "@/components/search/InitiativeList";
import { parseSearchParams, searchInitiatives } from "@/lib/SearchAPI";
import { testInitiatives } from "@/testdata/SearchTestData";

export default async function SearchInitiativePage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q = "" } = await searchParams;
    const needle = q.trim().toLowerCase();

    const query = parseSearchParams(await searchParams);
    //const initiatives = await searchInitiatives(query);
    
    const initiatives = testInitiatives.filter((i) =>
        [i.name ?? "", i.description].some((t) => t.toLowerCase().includes(needle))
    );
    
    return (
        <>
            <HeaderConfigPublisher
                path="/search/initiatives"
                config={{ ...DEFAULT_HEADER_CONFIG, initialQuery: q }}
            />
            <SearchControls />
            <PageContent>
                <InitiativeList initiatives={initiatives}/>
            </PageContent>
        </>
    );
}