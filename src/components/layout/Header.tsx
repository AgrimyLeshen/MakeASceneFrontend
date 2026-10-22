"use client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type {Route} from "next";

import { useCallback, useState, type ReactNode } from "react";
import HamburgerSideBar from "@/components/layout/HamburgerSideBar";
import FilterSideBar from "@/components/layout/FilterSideBar";
import SearchBar from "@/components/layout/Searchbar";
import SidebarOverlay from "@/components/layout/SideBarOverlay";

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

    /** sidebar content */
    menuPanel?: ReactNode;

    /** filter content */
    filterPanel?: ReactNode;

    logoSrc?: string;
    title?: string;
}

const defaultNav: NavItem[] = [
    { id: "nearby", label: "Nearby", href: "/nearby" },
    { id: "myscene", label: "My Scene", href: "/myscene" },
    { id: "getinvolved", label: "Get Involved", href: "/getinvolved" },
];

type Panel = "menu" | "filter" | null;

const navLinkBase =
  "relative flex h-full items-center whitespace-nowrap px-3 text-[13px] transition-colors hover:text-white " +
  "after:absolute after:inset-x-1 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-[#cfdde3] after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100";

  
export default function Header({navItems = defaultNav, onNavChange, activeNav, onSearch, menuPanel, filterPanel, logoSrc = "/images/image.png", title = "MakeAScene",}: HeaderTypes) {

    const [panel, setPanel] = useState<Panel>(null);
    const [query, setQuery] = useState("");
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);


    const toggle = (target: Exclude<Panel, null>) =>
        setPanel((current) => (current === target ? null : target));


    const closePanel = useCallback(() => setPanel(null), []);

    const router = useRouter();
    const pathname = usePathname();

    const isItemActive = (item: NavItem) => !!item.href && (pathname == item.href || pathname.startsWith(item.href + "/"));

    const handleSearch = (q: string) => {
        const trimmed = q.trim();
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-[3000] bg-header shadow-[0_10px_20px_rgba(0,0,0,0.35)]">
                <div className="flex h-[55px] items-center gap-2 px-[clamp(10px,2%,10px)] sm:gap-4">
                    <HamburgerSideBar
                        isOpen={panel === "menu"}
                        onClick={() => toggle("menu")}
                        controls="sidebar-menu"
                    />

                    {/* for mobile */}
                    <div className="hidden items-center gap-3 sm:flex">
                        <div className="h-[50px] w-[50px] translate-y-[5px] overflow-hidden rounded-full bg-text ring-4 ring-header">
                            <img src="logo.svg" alt="logo" className="h-full w-full object-cover" />
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
                                            ? "text-white after:scale-x-100"
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
                            <img src="search.svg" alt="search" className="h-5 w-5" />
                        </button>

                        <FilterSideBar
                            isOpen={panel === "filter"}
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
                open={panel === "menu"}
                onClose={closePanel}
            >
                {menuPanel ?? <h2 className="text-xl font-bold">Menu</h2>}
            </SidebarOverlay>

            <SidebarOverlay
                id="sidebar-filter"
                side="right"
                label="Filter"
                open={panel === "filter"}
                onClose={closePanel}
            >
                {filterPanel ?? <h2 className="text-xl font-bold">Filter</h2>}
            </SidebarOverlay>
        </>
    );
}