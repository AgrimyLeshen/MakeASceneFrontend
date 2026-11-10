
import type { Sections } from "@/testdata/organizer";
import EventCard from "@/components/events/EventCard";
import PageContent from "@/components/shared/PageContent";

type OrganizerSectionProps = {
    section: Sections;
    backgroundColor: string;
    accentColor: string;
    textColor: string;
};

export default function OrganizerSection({
    section,
    backgroundColor,
    accentColor,
    textColor,
}: OrganizerSectionProps) {
    const { title, text, image, events } = section.data;

    switch (section.layout_variant) {
        // Text section
        case 0:
            if (!text || text.length === 0) {
                return null;
            }
            
            return (
                    <section
                        className="w-full py-8"
                        style={{
                            backgroundColor: backgroundColor,
                            color: textColor,
                        }}
                    >
                        <PageContent>
                            <div className="flex flex-col gap-5">
                                {title && title.length > 0 && (
                                    <h2 className="!text-2xl !font-extrabold">
                                        {title}
                                    </h2>
                                )}

                                {text?.map((paragraph, index) => (
                                    <p key={index} className="leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </PageContent>
                    </section>
                );

        // Image gallery
        case 1:
            if (!image?.length) return null;

            return (
                <section
                    className="w-full py-8"
                    style={{
                        backgroundColor: backgroundColor,
                    }}
                >
                    
                
                <PageContent>
                    <div className="flex flex-col gap-2">
                        {(() => {
                            const rowHeight = 180;
                            const gap = 8;
                            const targetWidth = 900;

                            const rows: string[][] = [];
                            let currentRow: string[] = [];
                            let currentWidth = 0;

                            image.forEach((src) => {
                                // Use a default aspect ratio until image dimensions
                                // are available; replace with actual ratios if possible.
                                const aspectRatio = 4 / 3;
                                const width = rowHeight * aspectRatio;

                                if (
                                    currentRow.length > 0 &&
                                    currentWidth + width + gap > targetWidth
                                ) {
                                    rows.push(currentRow);
                                    currentRow = [];
                                    currentWidth = 0;
                                }

                                currentRow.push(src);
                                currentWidth += width + (currentRow.length > 1 ? gap : 0);
                            });

                            if (currentRow.length) rows.push(currentRow);

                            return rows.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex gap-2">
                                    {row.map((src, index) => (
                                        <img
                                            key={`${src}-${index}`}
                                            src={src}
                                            alt={`Organizer image ${index + 1}`}
                                            loading="lazy"
                                            className="h-[180px] min-w-0 flex-1 rounded-lg object-cover"
                                        />
                                    ))}
                                </div>
                            ));
                        })()}
                    </div>
                </PageContent>


                </section>
            );

        // 1 Event + Text
        case 2:
            if (!events?.length || !text?.length) return null;

            return (
                <section
                    className="w-full pt-8"
                    style={{
                        backgroundColor: accentColor,
                        color: textColor,
                    }}
                >
                    <PageContent className="mx-auto !max-w-4xl px-6 pb-8 flow-root">
                        <div className="float-left mb-4 mr-8 w-64 md:w-72 lg:w-80">
                            {events[0] && (
                                <EventCard post={events[0]} />
                            )}
                        </div>

                        {title && title.length > 0 && (
                            <h2 className="!text-2xl !font-extrabold !mb-6">
                                {title}
                            </h2>
                        )}

                        <p className="space-y-6 leading-relaxed">
                            {text}
                        </p>
                    </PageContent>
                </section>
            );

        // Text, image
        case 3: {
            if (!image?.length || !text?.length) return null;

            return (
                <section
                    className="w-full pt-8"
                    style={{
                        backgroundColor,
                        color: textColor,
                    }}
                >
                    <PageContent
                        className={`mx-auto flow-root px-6 ${
                            title?.length ? "!max-w-4xl pb-8" : "pb-4"
                        }`}
                    >
                        <div
                            className={`float-right mb-4 ml-4 w-full min-[500px]:w-72 ${
                                title?.length ? "min-[700px]:w-80" : "min-[500px]:w-80 min-[900px]:w-96"
                            }`}
                        >
                            <img
                                src={image[0]}
                                alt="Organizer"
                                loading="lazy"
                                className={`w-full rounded-lg object-cover ${
                                    title?.length ? "h-64" : "h-[180px]"
                                }`}
                            />
                        </div>

                        {title && title.length > 0 && (
                            <h2 className="!mb-6 !text-2xl !font-extrabold [text-wrap:balance]">
                                {title}
                            </h2>
                        )}

                        <p className="leading-relaxed">
                            {text}
                        </p>
                    </PageContent>
                </section>
            );
        }
        
        // Our Team
        case 4:
            if (!image?.length || !text?.length) return null;

            return(
                <section
                    className="w-full pt-8"
                    style={{
                        backgroundColor,
                        color: textColor,
                    }}
                >
                    <PageContent>
                        {title && title.length > 0 && (
                            <h2 className="!mb-6 !text-2xl !font-extrabold">
                                {title}
                            </h2>
                        )}

                        <div className="flex flex-row flex-wrap justify-center gap-8">
                            {image.map((img, index) => (
                                <div
                                    key={index}
                                    className="flex min-w-25 flex-col items-center justify-start gap-2"
                                >
                                    <img
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        loading="lazy"
                                        className="h-48 w-48 shrink-0 rounded-lg object-cover"
                                    />

                                    {text[index]?.split("|").map((line, i) => (
                                        <p key={i} className="w-full text-center leading-relaxed">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </PageContent>
                </section>
            );
        
        //Image with description
        case 5: {
            if (!image?.length) return null;

            return (
                <section
                    className="w-full pt-8"
                    style={{
                        backgroundColor,
                        color: textColor,
                    }}
                >
                    <PageContent className="mx-auto px-4 sm:px-6 pb-8">
                        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:gap-6">
                            <div className="w-full sm:w-3/5 sm:shrink-0">
                                <img
                                    src={image[0]}
                                    alt="Organizer"
                                    loading="lazy"
                                    className="h-auto max-h-[280px] w-full rounded-lg object-cover sm:h-full sm:max-h-none sm:min-h-[280px]"
                                />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col self-stretch">
                                {title && title.length > 0 && (
                                    <h2 className="!mb-3 break-normal hyphens-auto text-lg sm:!mb-6 sm:text-2xl">
                                        {title}
                                    </h2>
                                )}

                                {text && text.length > 0 && (
                                    <p className="!mt-auto leading-relaxed !text-xs sm:!text-sm">
                                        {text}
                                    </p>
                                )}
                            </div>
                        </div>
                    </PageContent>
                </section>
            );
        };

        //Call to action: (Title) + Text = ButtonText|Buttonlink + (Image[0]-left imgage Image[1]-right image)
        case 6: {
            if (!text?.length) return null;

            const [label, url] = text[0].split("|");

            return (
                <section
                    className="w-full overflow-hidden"
                    style={{
                        background: accentColor,
                        color: textColor,
                    }}
                >
                    <div className="flex w-full items-stretch justify-between  sm:gap-4">

                        {image?.[0] && (
                            <div className="flex min-w-0 flex-1 items-center justify-start">
                                <img
                                    src={image[0]}
                                    alt="Organizer"
                                    loading="lazy"
                                    className="h-full max-h-[320px] w-full object-cover object-center"
                                />
                            </div>
                        )}

                        <PageContent className="mx-0 flex w-0 min-w-0 flex-[2_1_0%] flex-col items-center justify-center gap-4 overflow-hidden px-0 pt-6 pb-8 text-center md:gap-8">
                            {title && title.length > 0 && (
                                <h2 className="!mb-6 !text-2xl !font-extrabold md:!text-4xl lg:!text-5xl">
                                    {title}
                                </h2>
                            )}

                            <a
                                href={url.trim()}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    backgroundColor: textColor,
                                    color: accentColor,
                                }}
                                className="inline-flex min-h-[42px] w-full max-w-fit min-w-0 cursor-pointer items-center justify-center break-words rounded-xl px-4 py-2 text-base !font-extrabold shadow-lg transition-all hover:opacity-80 sm:min-h-[50px] sm:px-8 sm:py-3 sm:text-xl lg:min-h-[64px] lg:px-12 lg:py-4 lg:text-2xl xl:min-h-[72px] xl:text-3xl"
                            >
                                {label.trim()}
                            </a>
                        </PageContent>

                        {image?.[1] && (
                            <div className="flex min-w-0 flex-1 items-center justify-end">
                                <img
                                    src={image[1]}
                                    alt="Organizer"
                                    loading="lazy"
                                    className="h-full max-h-[320px] w-full object-cover object-center"
                                />
                            </div>
                        )}

                    </div>
                </section>
            );
        }

        //Call to action on image: Image + Title(?) + Text = ButtonText|Buttonlink
        case 7: {
            if (!text?.length) return null;
            if (!image?.length) return null;

            const [label, url] = text[0].split("|");
            
            return(
                <div style={{ backgroundColor, color: textColor }} className="pb-16">
                    <div className="relative w-full">
                        <img
                            src={image[0]}
                            alt="Organizer"
                            className="absolute inset-0 min-h-[220px] md:min-h-[320px] lg:min-h-[480px] h-full w-full object-cover"
                        />

                        <div className="absolute min-h-[220px] md:min-h-[320px] lg:min-h-[480px] inset-0 bg-black/40" />

                        <PageContent className="relative z-10 flex h-full min-h-[220px] flex-col items-center justify-between gap-6 px-8 pb-8 pt-8 text-center md:min-h-[320px] lg:min-h-[480px]">

                            {title && title.length > 0 && (
                                <h2 className="!mb-0 !text-2xl !font-extrabold text-white md:!text-4xl lg:!text-5xl">
                                    {title}
                                </h2>
                            )}

                            <a
                                href={url.trim()}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    backgroundColor: textColor,
                                    color: accentColor,
                                }}
                                className="inline-flex min-h-[42px] min-w-[220px] cursor-pointer items-center justify-center rounded-xl px-8 py-2 text-lg !font-extrabold shadow-lg transition-all hover:opacity-80 sm:min-h-[50px] sm:min-w-[280px] sm:px-12 sm:py-3 sm:text-xl lg:min-h-[64px] lg:min-w-[340px] lg:px-16 lg:py-4 lg:text-2xl xl:min-h-[72px] xl:min-w-[380px] xl:text-3xl"
                            >
                                {label.trim()}
                            </a>

                        </PageContent>
                    </div>
                        
                </div>
            );
        }

        // Ignore unsupported layout variants
        default:
            return null;
    }
}
