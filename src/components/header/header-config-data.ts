import type { FilterContentProps } from "@/components/forms/FilterContent";
import type { MenuContentProps, MenuLinkData } from "@/components/forms/HamburgerContent";

export const DEFAULT_ABOUT_LINKS: MenuLinkData[] = [
  { id: "guidelines", label: "User Guidelines", href: "/guidelines" },
  { id: "ideas", label: "Send in your Ideas", href: "/ideas" },
  { id: "bug", label: "Report a Bug", href: "/report-bug" },
  { id: "support", label: "Support us", href: "/support" },
  { id: "discord", label: "Join our Discord", href: "https://discord.com" },
];

/** All page-specific header props, excluding callbacks. */
export type HeaderConfig = {
  initialQuery?: string;
  themeId?: string;
  filterContent: Omit<FilterContentProps, "onChange">;
  hamburgerContent: Omit<MenuContentProps, "onNewInitiative" | "onNavigate">;
};

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  filterContent: {
    subscribedTags: [],
    locations: [],
    whatTags: [],
    blockedTags: [],
    sections: ["subscribed", "where", "when", "what", "blocked"],
  },
  hamburgerContent: {
    initiatives: [],
    hasUnreadNotifications: false,
    aboutLinks: [...DEFAULT_ABOUT_LINKS],
    sections: ["initiatives", "yours", "about"],
  },
};
