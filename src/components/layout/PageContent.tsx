/**
 * PageContent
 *
 * Provides consistent, responsive horizontal gutters (left & right margins) for page content.
 *
 * Usage:
 * - Default: Wraps content in a centered container with responsive
 *   horizontal padding and a maximum width.
 * - scrollable={true}: Creates a horizontally scrollable content area
 *   with the same responsive gutters. Use this for rows of cards or
 *   other content that may extend beyond the viewport.
 * - snap={true}: Elements can snap align
 *
 * Important:
 * - Place PageContent inside a full-width section if the section needs
 *   a background color that extends to both screen edges.
 * - Keep background styles on the outer section, not PageContent.
 * - Use className to add additional styling when needed.
 *
 * Examples:
 * <PageContent>
 *     <p>Regular page content</p>
 * </PageContent>
 *
 * <PageContent scrollable>
 *     <div className="flex gap-4">
 *         {items.map((item) => (
 *             <Card key={item.id} item={item} />
 *         ))}
 *     </div>
 * </PageContent>
 */

import type { ReactNode, WheelEvent } from "react";
import HorizontalScroll from "./HorizontalScroll";

type PageContentProps = {
    children: ReactNode;
    className?: string;
    scrollable?: boolean;
    backgroundColor?: string;
    accentColor?: string;
};

const gutterClasses =
    "px-10 sm:px-12 md:px-20 lg:px-24 xl:px-28 2xl:px-32";

export default function PageContent({
    children,
    className = "",
    scrollable = false,
    backgroundColor,
    accentColor,
}: PageContentProps) {
    if (scrollable) {
        return (
            <HorizontalScroll className={className} backgroundColor={backgroundColor} accentColor={accentColor}>
                <div className={`flex w-max min-w-full ${gutterClasses}`}>
                    {children}
                </div>
            </HorizontalScroll>
        );
    }

    return (
        <div className={`mx-auto w-full max-w-screen-2xl ${gutterClasses} ${className}`}>
            {children}
        </div>
    );
}
