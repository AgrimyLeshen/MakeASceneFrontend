"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type {Route} from "next";

import { useCallback, useState, type ReactNode } from "react";
import FilterContent from "@/components/forms/FilterContent";
import MenuContent from "@/components/forms/HamburgerContent";
import { useHeaderConfig } from "@/components/header/HeaderContext";
import HamburgerSideBar from "@/components/header/HamburgerSideBar";
import FilterSideBar from "@/components/header/FilterSideBar";
import SearchBar from "@/components/search/Searchbar";
import SidebarOverlay from "@/components/header/SideBarOverlay";

export interface NavItem {
    id: string;
    label: string;
    href?: Route;
}

type HeaderTypes = {
    navItems?: NavItem[];
    activeNav?: string;
    onNavChange?: (id: string) => void;
    onSearch?: (query: string) => void;
    initialQuery?: string;

    /** sidebar content */
    menuContent?: ReactNode;

    /** filter content */
    filterContent?: ReactNode;

    logoSrc?: string;
    title?: string;
}

const defaultNav: NavItem[] = [
    { id: "nearby", label: "Nearby", href: "/nearby" },
    { id: "myscene", label: "My Scene", href: "/myscene" },
    { id: "getinvolved", label: "Get Involved", href: "/getinvolved" },
];

type Content = "menu" | "filter" | null;

export const navLinkBase =
  "relative flex h-full items-center whitespace-nowrap px-3 text-[13px] transition-colors hover:text-white " +
  "after:absolute after:inset-x-1 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-[#cfdde3] after:transition-transform after:duration-200 after:content-[''] ";

  
export default function Header({navItems = defaultNav, onNavChange, activeNav, onSearch, menuContent, filterContent, initialQuery, logoSrc = "/images/image.png", title = "MakeAScene",}: HeaderTypes) {

    const pathname = usePathname();
    const router = useRouter();
    const headerConfig = useHeaderConfig(pathname);
    const queryToSync = headerConfig.initialQuery ?? initialQuery;

    const [content, setContent] = useState<Content>(null);

    const [queryState, setQueryState] = useState(() => ({
        source: queryToSync,
        value: queryToSync ?? "",
    }));
    if (queryToSync !== undefined && queryState.source !== queryToSync) {
        setQueryState({ source: queryToSync, value: queryToSync });
    }
    const query = queryState.value;
    const setQuery = (value: string) => {
        setQueryState((current) => ({ ...current, value }));
    };


    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    const toggle = (target: Exclude<Content, null>) =>
        setContent((current) => (current === target ? null : target));


    const closePanel = useCallback(() => setContent(null), []);

    const isItemActive = (item: NavItem) => !!item.href && (pathname == item.href || pathname.startsWith(item.href + "/"));


    const onSearchPage = pathname.startsWith("/search");

    const handleSearch = (q: string) => {
        const trimmed = q.trim();

        const params = new URLSearchParams(onSearchPage ? window.location.search : "");
        if(trimmed) params.set("q", trimmed);
        else params.delete("q")

        const base = onSearchPage ? pathname : "/search/events";
        const qs = params.toString();
        router.push(`${base}${qs ? `?${qs}` : ""}` as Route);
        onSearch?.(trimmed);
    };

    const openSearchPage = () => {
        if (onSearchPage) return;

        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        const qs = params.toString();
        router.push(`/search/events${qs ? `?${qs}` : ""}` as Route);
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-[3000] bg-header shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
                <div className="flex h-[55px] items-center gap-2 px-[clamp(10px,2%,10px)] sm:gap-4">
                    <HamburgerSideBar
                        isOpen={content === "menu"}
                        onClick={() => toggle("menu")}
                        controls="sidebar-menu"
                    />

                    {/* for mobile */}
                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="h-[50px] w-[50px] translate-y-[5px] overflow-hidden rounded-full bg-header ring-4 ring-header">
                            <img src="/logo.svg" alt="logo" className="h-full w-full object-cover" />
                        </div>
                        <span className="whitespace-nowrap text-[22px] font-bold text-text">
                            {title}
                        </span>
                    </div>

                    <nav
                        aria-label="Main"
                        className="flex h-full min-w-0 flex-1 items-center justify-center sm:flex-none sm:justify-start sm:pl-2"
                    >
                        {navItems.map((item) => {
                            const isActive = isItemActive(item);
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href ?? "/"}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`${navLinkBase} ${
                                        isActive
                                            ? "text-text after:scale-x-100"
                                            : "text-text-muted"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex flex-none items-center gap-2 sm:ml-auto sm:gap-4">
                        <SearchBar
                            value={query}
                            onChange={setQuery}
                            onSubmit={handleSearch}
                            onFocus={openSearchPage}
                            className="hidden w-[clamp(150px,20vw,350px)] sm:flex"
                        />

                        {/* for mobile */}
                        <button
                            type="button"
                            onClick={() => setMobileSearchOpen((o) => !o)}
                            aria-label="Toggle search"
                            aria-expanded={mobileSearchOpen}
                            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 sm:hidden"
                        >
                            <img src="/search.svg" alt="search" className="h-5 w-5" />
                        </button>

                        <FilterSideBar
                            isOpen={content === "filter"}
                            onClick={() => toggle("filter")}
                            controls="sidebar-filter"
                        />
                    </div>
                </div>

                {/* for mobile */}
                {mobileSearchOpen && (
                    <div className="absolute inset-x-0 top-full bg-header p-3 shadow-lg sm:hidden">
                        <SearchBar
                            value={query}
                            onChange={setQuery}
                            onSubmit={(q) => {
                                handleSearch(q);
                                setMobileSearchOpen(false);
                            }}
                        />
                    </div>
                )}
            </header>

            <SidebarOverlay
                id="sidebar-menu"
                side="left"
                label="Menu"
                open={content === "menu"}
                onClose={closePanel}
            >
                {menuContent ?? (
                    <MenuContent
                        {...headerConfig.hamburgerContent}
                        onNavigate={closePanel}
                    />
                )}
            </SidebarOverlay>

            <SidebarOverlay
                id="sidebar-filter"
                side="right"
                label="Filter"
                open={content === "filter"}
                onClose={closePanel}
            >
                {filterContent ?? <FilterContent {...headerConfig.filterContent} />}
            </SidebarOverlay>
        </>
    );
}