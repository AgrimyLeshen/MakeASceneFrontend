"use client";

/**
 * Header
 *
 * One header for the whole app. It contains:
 *  - hamburger (left sidebar), logo, main navigation
 *  - search bar (desktop) / search toggle with an extra bar (mobile)
 *  - filter button (right sidebar)
 *
 * Sizes (Tailwind breakpoints):
 *  - desktop  >= lg (1024px): logo + title, nav, full search bar
 *  - middle   md..lg:         logo only (title hidden), nav, search bar
 *  - phone    <  md (768px):  hamburger, centered nav, search icon (opens an extra bar)
 *
 * Search:
 *  - Focusing the search bar opens /search/events.
 *  - Typing searches automatically (debounced), Enter searches immediately.
 *  - The query lives in the URL as ?q=..., so back/forward and shared links work.
 *    On /search/* the URL is the source of truth for the input.
 */

/* ------------------------------------------------------------------ */
/* Imports                                                             */
/* ------------------------------------------------------------------ */

import Link from "next/link";
import type { Route } from "next";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import FilterContent from "@/components/forms/FilterContent";
import MenuContent from "@/components/forms/HamburgerContent";
import { useHeaderConfig } from "@/components/header/HeaderContext";
import HamburgerSideBar from "@/components/header/HamburgerSideBar";
import FilterSideBar from "@/components/header/FilterSideBar";
import SidebarOverlay from "@/components/header/SideBarOverlay";
import SearchBar from "@/components/search/Searchbar";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface NavItem {
    id: string;
    label: string;
    href?: Route;
}

type HeaderTypes = {
    navItems?: NavItem[];
    onSearch?: (query: string) => void;

    /** Pre-fills the search bar on pages outside /search (a page can also set it via HeaderConfig). */
    initialQuery?: string;

    /** Overrides for the sidebar content. Without them the page's header config is used. */
    menuContent?: ReactNode;
    filterContent?: ReactNode;

    title?: string;

    // Currently unused (kept so existing callers don't break):
    activeNav?: string;
    onNavChange?: (id: string) => void;
    logoSrc?: string;
};

/** Which sidebar is open: only one at a time. */
type Panel = "menu" | "filter" | null;

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const defaultNav: NavItem[] = [
    { id: "nearby", label: "Nearby", href: "/nearby" },
    { id: "myscene", label: "My Scene", href: "/myscene" },
    { id: "getinvolved", label: "Get Involved", href: "/getinvolved" },
];

/** Debounce for search-as-you-type, in ms. */
const SEARCH_DELAY = 300;

/**
 * Nav link with an animated underline (grows on hover, stays when active).
 * Exported because SearchTabs uses the same style.
 */
export const navLinkBase =
    "relative flex h-full items-center whitespace-nowrap px-3 text-[13px] transition-colors hover:text-white " +
    "after:absolute after:inset-x-1 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-[#cfdde3] after:transition-transform after:duration-200 after:content-[''] ";

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function Header({
    navItems = defaultNav,
    onSearch,
    initialQuery,
    menuContent,
    filterContent,
    title = "MakeAScene",
}: HeaderTypes) {

    /* ---------------- Routing & config ---------------- */

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const headerConfig = useHeaderConfig(pathname); // page-specific sidebar content

    const onSearchPage = pathname.startsWith("/search");

    const isItemActive = (item: NavItem) =>
        !!item.href && (pathname === item.href || pathname.startsWith(item.href + "/"));


    /* ---------------- Sidebars ---------------- */

    const [panel, setPanel] = useState<Panel>(null);

    // click on an open sidebar's button closes it, otherwise switch to it
    const togglePanel = (target: Exclude<Panel, null>) =>
        setPanel((current) => (current === target ? null : target));

    const closePanel = useCallback(() => setPanel(null), []);


    /* ---------------- Search: input state ---------------- */

    // On /search/* the URL decides what the input shows.
    // Elsewhere a page may pre-fill it (via header config or prop).
    const urlQuery = onSearchPage
        ? searchParams.get("q") ?? ""
        : headerConfig.initialQuery ?? initialQuery ?? "";

    const [query, setQuery] = useState(urlQuery);

    // The last value WE wrote into the URL. Lets us tell our own URL updates
    // (ignore them) from back/forward navigation (sync the input).
    const lastWritten = useRef(urlQuery);

    // Pending debounce timer for search-as-you-type.
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // URL changed from outside (back/forward, link) -> update the input.
    // Without the lastWritten check, a slow URL update would overwrite what the user typed meanwhile.
    useEffect(() => {
        if (urlQuery !== lastWritten.current) {
            lastWritten.current = urlQuery;
            setQuery(urlQuery);
        }
    }, [urlQuery]);

    // don't fire a search after the header is gone
    useEffect(() => () => clearTimeout(timer.current), []);


    /* ---------------- Search: mobile bar ---------------- */

    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    // Close the mobile bar when leaving the search area.
    // It stays open when entering /search or switching between its tabs.
    // (State is adjusted during render instead of in an effect to avoid a flash.)
    const [prevPathname, setPrevPathname] = useState(pathname);
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setPanel(null);
        if (!onSearchPage) setMobileSearchOpen(false);
    }


    /* ---------------- Search: actions ---------------- */

    /**
     * Writes ?q= into the URL. On /search/* it keeps the current tab and all other params
     * (filters, sort, ...); elsewhere it starts at /search/events.
     * Reads window.location on purpose: this also runs from a timeout, where props can be stale.
     */
    const writeQuery = (q: string, mode: "push" | "replace") => {
        const trimmed = q.trim();
        lastWritten.current = trimmed;

        const inSearch = window.location.pathname.startsWith("/search");
        const params = new URLSearchParams(inSearch ? window.location.search : "");
        if (trimmed) params.set("q", trimmed);
        else params.delete("q");

        const base = inSearch ? window.location.pathname : "/search/events";
        const qs = params.toString();
        const url = `${base}${qs ? `?${qs}` : ""}` as Route;

        if (mode === "push") router.push(url);
        else router.replace(url, { scroll: false }); // replace: typing must not flood the history
        onSearch?.(trimmed);
    };

    // typing -> search 300 ms after the last keystroke
    const handleChange = (value: string) => {
        setQuery(value);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            const inSearch = window.location.pathname.startsWith("/search");
            writeQuery(value, inSearch ? "replace" : "push"); // first search from another page = new history entry
        }, SEARCH_DELAY);
    };

    // Enter -> search immediately
    const handleSearch = (q: string) => {
        clearTimeout(timer.current);
        writeQuery(q, onSearchPage ? "replace" : "push");
    };

    // focusing the bar on another page opens the search page (keeping what is already typed)
    const openSearchPage = () => {
        if (onSearchPage) return;

        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        const qs = params.toString();
        router.push(`/search/events${qs ? `?${qs}` : ""}` as Route);
    };


    /* ---------------- Header height as CSS variable ---------------- */

    // The mobile search bar makes the header taller. Layouts below the header use
    // padding-top: var(--header-height) so nothing is covered.
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;

        const update = () =>
            document.documentElement.style.setProperty("--header-height", `${el.offsetHeight}px`);

        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);


    /* ---------------- Render ---------------- */

    return (
        <>
            <header
                ref={headerRef}
                className="fixed inset-x-0 top-0 z-[3000] bg-header shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
            >
                {/* ---- main bar ---- */}
                <div className="flex h-[55px] items-center gap-2 px-[clamp(10px,2%,10px)] md:gap-4">

                    {/* left: sidebar toggle */}
                    <HamburgerSideBar
                        isOpen={panel === "menu"}
                        onClick={() => togglePanel("menu")}
                        controls="sidebar-menu"
                    />

                    {/* logo from md up, title only from lg up */}
                    <div className="hidden items-center gap-3 md:flex">
                        <div className="h-[50px] w-[50px] translate-y-[5px] overflow-hidden rounded-full bg-header ring-4 ring-header">
                            <img src="/logo.svg" alt="logo" className="h-full w-full object-cover" />
                        </div>
                        <span className="hidden whitespace-nowrap text-[22px] font-bold text-text lg:inline">
                            {title}
                        </span>
                    </div>

                    {/* main navigation (centered on phones, left-aligned from md up) */}
                    <nav
                        aria-label="Main"
                        className="flex h-full min-w-0 flex-1 items-center justify-center md:flex-none md:justify-start md:pl-2"
                    >
                        {navItems.map((item) => {
                            const isActive = isItemActive(item);
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href ?? "/"}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`${navLinkBase} ${
                                        isActive ? "text-text after:scale-x-100" : "text-text-muted"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* right: search + filter */}
                    <div className="flex flex-none items-center gap-2 md:ml-auto md:gap-4">

                        {/* search bar (md and up) */}
                        <SearchBar
                            value={query}
                            onChange={handleChange}
                            onSubmit={handleSearch}
                            onFocus={openSearchPage}
                            className="hidden w-[clamp(150px,20vw,350px)] md:flex"
                        />

                        {/* search toggle (below md) */}
                        <button
                            type="button"
                            onClick={() => setMobileSearchOpen((open) => !open)}
                            aria-label="Toggle search"
                            aria-expanded={mobileSearchOpen}
                            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 md:hidden"
                        >
                            <img src="/search.svg" alt="search" className="h-5 w-5" />
                        </button>

                        <FilterSideBar
                            isOpen={panel === "filter"}
                            onClick={() => togglePanel("filter")}
                            controls="sidebar-filter"
                        />
                    </div>
                </div>

                {/* ---- extra search bar (below md), part of the header so it pushes content down ---- */}
                {mobileSearchOpen && (
                    <div className="bg-header p-3 shadow-lg md:hidden">
                        <SearchBar
                            value={query}
                            onChange={handleChange}
                            onSubmit={(q) => {
                                handleSearch(q);
                                setMobileSearchOpen(false);
                            }}
                            onFocus={openSearchPage}
                        />
                    </div>
                )}
            </header>

            {/* ---- sidebars ---- */}

            <SidebarOverlay
                id="sidebar-menu"
                side="left"
                label="Menu"
                open={panel === "menu"}
                onClose={closePanel}
            >
                {menuContent ?? (
                    <MenuContent {...headerConfig.hamburgerContent} onNavigate={closePanel} />
                )}
            </SidebarOverlay>

            <SidebarOverlay
                id="sidebar-filter"
                side="right"
                label="Filter"
                open={panel === "filter"}
                onClose={closePanel}
            >
                {filterContent ?? <FilterContent {...headerConfig.filterContent} />}
            </SidebarOverlay>
        </>
    );
}