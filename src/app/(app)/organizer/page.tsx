import { organizerTestData } from "@/testdata/organizer";
import EventCard from "@/components/events/EventCard";
import mapPin from "../../oldJsVersion/assets/Map pin.png";
import contact from "../../oldJsVersion/assets/searchIcon.png";
import globe from "../../oldJsVersion/assets/heartOutline.png";
import PageContent from "@/components/layout/PageContent";
import OrganizerSection from "@/components/sections/OrganizerSections";

export default function OrganizerPage() {
    const organizer = organizerTestData;
    const [backgroundColor, accentColor, textColor] = organizer.colors;

    return (
        <div style={{ backgroundColor, color: textColor }} className="pb-16">
            <div className="relative w-full">
                <img
                    src={organizer.banner}
                    alt={`${organizer.name} banner`}
                    className="w-full h-72 object-cover"
                />
            
                <div 
                    className="absolute top-0 left-0 flex items-center gap-3 rounded-br-lg bg-black/50 px-3 py-2 text-white"
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
                    className="absolute bottom-0 right-0 space-y-3 rounded-tl-lg bg-black/50 p-4 text-white text-xs"
                    style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 80%, transparent)`, color: textColor}}
                >
                    <div className="flex items-center justify-end gap-3">
                        
                        <span>{organizer.location}</span>
                        <img
                            src={mapPin.src}
                            alt="Location"
                            className="h-4 w-4 object-contain"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <span>{organizer.contactInfo}</span>
                        <img
                            src={contact.src}
                            alt="Contact"
                            className="h-4 w-4 object-contain"
                        />
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
                        <img
                            src={globe.src}
                            alt="Website"
                            className="h-4 w-4 object-contain"
                        />
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
    )
}