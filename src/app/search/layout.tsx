"use client";

import { Suspense, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Header from "@/components/header/Header";
import FilterContent, { type SectionId } from "@/components/forms/FilterContent";
import MenuContent from "@/components/forms/HamburgerContent";
import SearchTabs from "@/components/search/SearchTabs"; 


function SearchShell({ children }: { children: ReactNode }) {
    
    const pathname = usePathname();
    const q = useSearchParams().get("q") ?? "";
    const tab = pathname.split("/")[2] ?? "events";

    return (
        <>
            <Header
                initialQuery={q}
                filterContent={<FilterContent/>}
                menuContent={<MenuContent/>}
            />
            <div className="pt-[55px]">
                <SearchTabs />
                {children}
            </div>
        </>
    );
}

export default function SearchLayout({ children }: { children: ReactNode }) {
    // useSearchParams needs a Suspense boundary
    return <Suspense><SearchShell>{children}</SearchShell></Suspense>;
}