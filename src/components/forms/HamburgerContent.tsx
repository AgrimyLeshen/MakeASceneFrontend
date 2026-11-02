"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import type { ReactNode } from "react";


/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type MenuSectionId = "initiatives" | "yours" | "about";

export const ALL_MENU_SECTIONS: MenuSectionId[] = ["initiatives", "yours", "about"];

export interface Initiative {
  id: string;
  name: string;
  pfpSrc?: string;
  hasNotification?: boolean;
  href?: string;
}

export interface MenuLinkData {
  id: string;
  label: string;
  href: string;
}

interface MenuContentProps {
  initiatives?: Initiative[];
  onNewInitiative?: () => void;
  hasUnreadNotifications?: boolean;
  aboutLinks?: MenuLinkData[];
  sections?: MenuSectionId[];
  onNavigate?: () => void;
}


/* ------------------------------------------------------------------ */
/* Defaults                                                           */
/* ------------------------------------------------------------------ */

const yoursItems = [
  { id: "notifications", label: "Notifications", href: "/notifications", iconSrc: "/notifications.svg" },
  { id: "locations", label: "Locations", href: "/locations", iconSrc: "/locations.svg" },
  { id: "tags", label: "Tags", href: "/tags", iconSrc: "/tags.svg" },
  { id: "events", label: "Events", href: "/events", iconSrc: "/events.svg" },
  { id: "subscriptions", label: "Subscriptions", href: "/subscriptions", iconSrc: "/subscription.svg" },
  { id: "blocked", label: "Blocked", href: "/blocked", iconSrc: "/blocked.svg" },
];


const defaultAboutLinks: MenuLinkData[] = [
  { id: "guidelines", label: "User Guidelines", href: "/guidelines" },
  { id: "ideas", label: "Send in your Ideas", href: "/ideas" },
  { id: "bug", label: "Report a Bug", href: "/report-bug" },
  { id: "support", label: "Support us", href: "/support" },
  { id: "discord", label: "Join our Discord", href: "https://discord.com" },
];


/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

const rowBase = "flex items-center gap-3 rounded-md px-2 py-1.5 text-[14px] transition-colors hover:text-text";

const focusRing = "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60";

function Divider() {
  return <hr className="border-0 border-t-2 border-stripline" />;
}

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="px-2 text-xl font-normal text-text">{children}</h3>;
}

function Dot() {
  return <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-notification" />;
}



/** Internal paths use next/link, external URLs open in a new tab. */
function MenuLink({
  href,
  active = false,
  onNavigate,
  className,
  children,
}: {
  href: string;
  active?: boolean;
  onNavigate?: () => void;
  className?: string;
  children: ReactNode;
}) {
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" onClick={onNavigate} className={className}>
        {children}
      </a>
    );
  }
  return (
        <Link
        href={href as Route}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
        className={className}
        >
        {children}
        </Link>
    );
}


function MaskIcon({ src }: { src: string }) {
    const mask = {
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
    } as const;

    return <span aria-hidden="true" className="inline-block h-[18px] w-[18px] bg-current" style={mask} />;
}

/* ------------------------------------------------------------------ */
/* MenuContent                                                        */
/* ------------------------------------------------------------------ */

export default function MenuContent({initiatives = [], onNewInitiative, hasUnreadNotifications = false, aboutLinks = defaultAboutLinks, sections = ALL_MENU_SECTIONS, onNavigate
}: MenuContentProps) {

  const pathname = usePathname();
  const show = (id: MenuSectionId) => sections.includes(id);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="flex flex-col gap-5 text-text">

        {/* ---------------- Initiatives ---------------- */}
        {show("initiatives") && (
            <>
                <section className="flex flex-col gap-3">
                    <h2 className="px-2 text-lg font-normal">Plan your own events!</h2>

                    <div className="flex flex-col gap-1">
                        {initiatives.map((item) => {
                            const content = (
                                <>
                                    <span className="relative h-6 w-6 shrink-0">
                                        {item.pfpSrc ? (
                                            <img src={item.pfpSrc} alt="" className="h-full w-full rounded-md object-cover" />
                                        ) : (
                                            <span className="block h-full w-full rounded-md bg-text-muted/60" />
                                        )}
                                        {item.hasNotification && <Dot />}
                                    </span>
                                    <span className="truncate">{item.name}</span>
                                </>
                            );
                            const cls = `${rowBase} text-text-muted ${focusRing}`;

                            return item.href ? (
                                <MenuLink key={item.id} href={item.href} active={isActive(item.href)} onNavigate={onNavigate} className={cls}>
                                    {content}
                                </MenuLink>
                                ) : (
                                <div key={item.id} className={cls}>
                                    {content}
                                </div>
                            );
                        })}
                    </div>

                    <button
                        type="button"
                        onClick={onNewInitiative}
                        className={`w-full rounded-md bg-button-bg px-3 py-2 text-left text-[14px] text-text transition hover:brightness-110 ${focusRing}`}
                    >
                        New Initiative
                    </button>
                </section>
                <Divider />
            </>
        )}

        {/* ---------------- Yours ---------------- */}
        {show("yours") && (
            <>
            <section className="flex flex-col gap-2">
                    <Heading>Yours</Heading>
                    <nav aria-label="Yours" className="flex flex-col gap-0.5">
                        {yoursItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <MenuLink
                                    key={item.id}
                                    href={item.href}
                                    active={active}
                                    onNavigate={onNavigate}
                                    className={`${rowBase} ${active ? "text-text" : "text-text-muted"} ${focusRing}`}
                                >
                                    <span className="relative flex shrink-0 text-icons-dark">
                                        <MaskIcon src={item.iconSrc} />
                                        {item.id === "notifications" && hasUnreadNotifications && <Dot />}
                                    </span>
                                    {item.label}
                                </MenuLink>
                            );
                        })}
                    </nav>
            </section>
            <Divider />
            </>
        )}

        {/* ---------------- MakeAScene ---------------- */}
        {show("about") && (
            <section className="flex flex-col gap-2">
                <Heading>MakeAScene</Heading>
                <nav aria-label="MakeAScene" className="flex flex-col gap-0.5">
                    {aboutLinks.map((link) => (
                        <MenuLink
                            key={link.id}
                            href={link.href}
                            active={isActive(link.href)}
                            onNavigate={onNavigate}
                            className={`${rowBase} pl-7 ${isActive(link.href) ? "text-text" : "text-text-muted"} ${focusRing}`}
                        >
                            {link.label}
                        </MenuLink>
                    ))}
                </nav>
            </section>
        )}
    </div>
  );
}
