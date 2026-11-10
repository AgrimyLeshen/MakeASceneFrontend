import { Suspense, type ReactNode } from "react";
import SearchTabs from "@/components/search/SearchTabs";
import PageContent from "@/components/shared/PageContent";


function SearchShell({ children }: { children: ReactNode }) {
    

    return (
        <>
            <div className="pt-[var(--header-height,55px)]">
                <PageContent >
                    <SearchTabs />
                    {children}
                </PageContent>
            </div>
        </>
    );
}

export default function SearchLayout({ children }: { children: ReactNode }) {
    return <Suspense fallback={null}><SearchShell>{children}</SearchShell></Suspense>;
}