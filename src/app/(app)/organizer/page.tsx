"use client";

import { organizerTestData } from "@/testdata/organizer";
import EventCard from "@/components/events/EventCard";
import mapPin from "../../oldJsVersion/assets/Map pin.png";
import contact from "../../oldJsVersion/assets/searchIcon.png";
import globe from "../../oldJsVersion/assets/heartOutline.png";
import PageContent from "@/components/shared/PageContent";
import OrganizerSection from "@/components/sections/OrganizerSections";
import { FilterData } from '@/components/forms/Filter';
import { ALL_SECTIONS } from '@/components/forms/FilterContent';
import { ALL_MENU_SECTIONS, DEFAULT_ABOUT_LINKS } from '@/components/forms/HamburgerContent';
import { HeaderConfigPublisher } from '@/components/header/HeaderContext';
import type { HeaderConfig } from '@/components/header/header-config-data';
import MaskIcon from "@/components/shared/MaskIcon";

const filters: FilterData[] = [
  { id: "music", name: "Musik" },                                   // none
  { id: "sport", name: "Sport", selection: "include" },             // include
  { id: "ads", name: "Werbung", selection: "exclude" },             // exclude
  { id: "news", name: "News", mark: "subscribed", selection: "include" }, // subscribed + include
  { id: "talk", name: "Talk", mark: "subscribed", selection: "exclude" }, // subscribed + exclude
  { id: "spam", name: "Spam", mark: "blocked" },                    // blocked (always exclude)
];

const headerConfig = {
  filterContent: {
    sections: [...ALL_SECTIONS],
    subscribedTags: filters,
    locations: filters,
    whatTags: filters,
    blockedTags: filters,
  },
  hamburgerContent: {
    initiatives: [
      { id: "a", name: "Initiative Name", hasNotification: true, href: "/organizer" },
      { id: "b", name: "Initiative Name", href: "/initiative/b" },
    ],
    hasUnreadNotifications: true,
    aboutLinks: [...DEFAULT_ABOUT_LINKS],
    sections: [...ALL_MENU_SECTIONS],
  },
} satisfies HeaderConfig;

export default function OrganizerPage() {

    const organizer = organizerTestData;
    const [backgroundColor, accentColor, textColor] = organizer.colors;

    return (
        <>
            <HeaderConfigPublisher path="/myscene" config={headerConfig} />

            <div style={{ backgroundColor, color: textColor }} className="pb-16 pt-12">
                <div className="relative w-full">
                    <img
                        src={organizer.banner}
                        alt={`${organizer.name} banner`}
                        className="w-full h-72 object-cover"
                    />
                
                    <div 
                        className="absolute top-0 left-0 flex items-center gap-3 rounded-br-lg bg-header/50 px-3 py-2 text-text"
                        style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 80%, transparent)`, color: textColor}}
                    >
                        <img
                            src={organizer.profilePic}
                            alt="profilePic"
                            className="h-10 w-10 rounded-md object-cover"
                        />
                        <span className="text-s font-semibold">{organizer.name}</span>
                    </div>

                    <div 
                        className="absolute bottom-0 right-0 space-y-3 rounded-tl-lg bg-header/50 p-4 text-text text-xs"
                        style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 80%, transparent)`, color: textColor}}
                    >
                        <div className="flex items-center justify-end gap-3">
                            
                            <span>{organizer.location}</span>
                            <span className="top-1/2 flex text-icons" style={{ color: textColor}}>
                                    <MaskIcon src="/locations.svg" className="h-4 w-4 object-contain"/>
                            </span>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <span>{organizer.contactInfo}</span>
                            <span className="top-1/2 flex text-icons" style={{ color: textColor}}>
                                    <MaskIcon src="/contact.svg" className="h-4 w-4 object-contain"/>
                            </span>
                        </div>

                        <div className="flex items-center justify-end gap-3">
                        <a
                                href={organizer.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {organizer.website}
                            </a>
                            <span className="top-1/2 flex text-icons" style={{ color: textColor}}>
                                    <MaskIcon src="/globe.svg" className="h-4 w-4 object-contain"/>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="w-full py-6 pb-10">
                    <PageContent>
                        <p className="text-sm leading-relaxed">
                            {organizer.description}
                        </p>
                    </PageContent>
                </div>

                <div className="w-full pt-8" style={{ backgroundColor: accentColor }}>
                    <PageContent>
                        <h2 className="pb-4">
                            Our Events
                        </h2>
                    </PageContent>

                    <PageContent scrollable backgroundColor={accentColor} accentColor={textColor} className="pb-4">
                        <div className="flex items-center py-2" style={{ gap: "12px" }}>
                            {organizer.events.map((event) => (
                                <div
                                    key={event.id}
                                    data-scroll-scale
                                    className=" w-70 md:w-75 lg:w-80 flex-none origin-center"
                                >
                                    <EventCard post={event} />
                                </div>
                            ))}
                        </div>
                    </PageContent>
                </div>

                {organizer.sections.map((section, index) => (
                    <OrganizerSection
                        key={`${section.layout_variant}-${index}`}
                        section={section}
                        backgroundColor={backgroundColor}
                        accentColor={accentColor}
                        textColor={textColor}
                    />
                ))}

            </div>
        </>
    )
}