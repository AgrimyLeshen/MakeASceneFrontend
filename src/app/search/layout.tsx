import { Suspense, type ReactNode } from "react";
import SearchTabs from "@/components/search/SearchTabs";


function SearchShell({ children }: { children: ReactNode }) {
    

    return (
        <>
            <div className="pt-[55px]">
                <SearchTabs />
                {children}
            </div>
        </>
    );
}

export default function SearchLayout({ children }: { children: ReactNode }) {
    return <Suspense fallback={null}><SearchShell>{children}</SearchShell></Suspense>;
}