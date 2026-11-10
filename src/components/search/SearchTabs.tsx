"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { navLinkBase } from "../header/Header";

const tabs = [
    { id: "events", label: "Events" },
    { id: "initiatives", label: "Initiatives" },
    { id: "tags", label: "Tags" },
];

export default function SearchTabs() {

    const pathname = usePathname();
    const params = useSearchParams().toString(); 

    return (
        <nav aria-label="Search" className="grid grid-cols-3 border-b border-stripline">
            {tabs.map((t) => {const active = pathname === `/search/${t.id}`;
                return (
                    <Link
                        key={t.id}
                        href={`/search/${t.id}${params ? `?${params}` : ""}` as Route}
                        aria-current={active ? "page" : undefined}
                        className={`${navLinkBase} justify-center py-2 ${
                        active ? "text-text after:scale-x-100" : "text-text-muted"}`}
                    >
                        {t.label}
                    </Link>
                );
            })}
        </nav>
    );
}