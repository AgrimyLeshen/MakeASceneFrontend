"use client";

import { FilterData } from "@/components/forms/Filter";
import { ALL_MENU_SECTIONS, DEFAULT_ABOUT_LINKS } from "@/components/forms/HamburgerContent";
import ThemeScope from "@/components/ui/ThemeScope";
import { HeaderConfigPublisher } from "@/components/header/HeaderContext";
import type { HeaderConfig } from "@/components/header/header-config-data";


const filters: FilterData[] = [
  { id: "music", name: "Musik" },                                   // none
  { id: "sport", name: "Sport", selection: "include" },             // include
  { id: "ads", name: "Werbung", selection: "exclude" },             // exclude
  { id: "news", name: "News", mark: "subscribed", selection: "include" }, // subscribed + include
  { id: "talk", name: "Talk", mark: "subscribed", selection: "exclude" }, // subscribed + exclude
  { id: "spam", name: "Spam", mark: "blocked" },                    // blocked (always exclude)
];

const headerConfig = {
  themeId: "sunset",
  filterContent: {
    sections: ["what", "where", "when"],
    subscribedTags: filters,
    locations: filters,
    whatTags: filters,
    blockedTags: filters,
  },
  hamburgerContent: {
    initiatives: [
      { id: "a", name: "Initiative Name", hasNotification: true, href: "/initiative/a" },
      { id: "b", name: "Initiative Name", href: "/initiative/b" },
    ],
    hasUnreadNotifications: true,
    aboutLinks: [...DEFAULT_ABOUT_LINKS],
    sections: [...ALL_MENU_SECTIONS],
  },
} satisfies HeaderConfig;

export default function NearbyPage() {
  return (
    <ThemeScope themeId="sunset">
      <HeaderConfigPublisher path="/nearby" config={headerConfig} />
      <div className="pt-[55px]" />
    </ThemeScope>
  );
}