"use client";

/**
 * HorizontalScroll
 *
 * Provides a horizontally scrollable container that:
 * - Converts vertical mouse-wheel movement into horizontal scrolling.
 * - Dynamic scroll Animation for items with the `data-scroll-scale` attribute
 *   based on items currently in focus.
 *
 *
 * Usage:
 * - Content must be wider than the visible container to scroll.
 * - Add `data-scroll-scale` to elements that should scale while scrolling. 
 * - Native horizontal trackpad gestures are supported.
 *
 * Important:
 * - This is a Client Component because it uses browser event listeners
 *   and React hooks.
 * - Vertical wheel movement is prevented while scrolling horizontally.
 * - The component does not define content widths or responsive gutters.
 *
 * Example:
 * <HorizontalScroll className="pb-4">
 *     <div className="flex gap-4">
 *         {items.map((item) => (
 *             <Card
 *                 key={item.id}
 *                 item={item}
 *                 data-scroll-scale
 *             />
 *         ))}
 *     </div>
 * </HorizontalScroll>
 */

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type HorizontalScrollProps = {
    children: ReactNode;
    className?: string;
    backgroundColor?: string;
    accentColor?: string;
};

export default function HorizontalScroll({
    children,
    className = "",
    backgroundColor,
    accentColor,
}: HorizontalScrollProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = scrollRef.current;
        if (!element) return;

        const items = Array.from(
            element.querySelectorAll<HTMLElement>("[data-scroll-scale]")
        );

        let rafId = 0;

        const updateScales = () => {
            cancelAnimationFrame(rafId);

            rafId = requestAnimationFrame(() => {
                if (items.length === 0) return;

                const containerRect = element.getBoundingClientRect();
                const containerCenter =
                    containerRect.left + element.clientWidth / 2;

                const maxScrollLeft =
                    element.scrollWidth - element.clientWidth;

                const atStart = element.scrollLeft <= 2;
                const atEnd =
                    maxScrollLeft > 2 &&
                    element.scrollLeft >= maxScrollLeft - 2;

                const minScale = 0.82;
                const maxScale = 1;

                // Increase this value for a more gradual size change.
                const falloffDistance = Math.max(element.clientWidth * 0.85, 1);

                items.forEach((item, index) => {
                    const rect = item.getBoundingClientRect();
                    const itemCenter = rect.left + rect.width / 2;

                    const distance = Math.abs(itemCenter - containerCenter);
                    const progress = Math.min(distance / falloffDistance, 1);
                    const eased = progress * progress * (3 - 2 * progress);

                    let scale = maxScale - (maxScale - minScale) * eased;

                    if (
                        (atStart && index === 0) ||
                        (atEnd && index === items.length - 1)
                    ) {
                        scale = maxScale;
                    }

                    item.style.transform = `scale(${scale})`;

                    // Reduce the gap as the card shrinks.
                    const gapReduction = (1 - scale) * 90;
                    item.style.marginLeft = `${-gapReduction / 2}px`;
                    item.style.marginRight = `${-gapReduction / 2}px`;
                });
            });
        };

        const handleWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
                return;
            }

            if (element.scrollWidth <= element.clientWidth) {
                return;
            }

            event.preventDefault();
            element.scrollLeft += event.deltaY;
        };

        element.addEventListener("scroll", updateScales, {
            passive: true,
        });
        element.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        window.addEventListener("resize", updateScales);

        updateScales();

        return () => {
            cancelAnimationFrame(rafId);
            element.removeEventListener("scroll", updateScales);
            element.removeEventListener("wheel", handleWheel);
            window.removeEventListener("resize", updateScales);
        };
    }, []);

    const scrollbarStyles = `
        .organizer-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: var(--scrollbar-accent) var(--scrollbar-bg);
        }

        .organizer-scrollbar::-webkit-scrollbar {
            height: 8px;
        }

        .organizer-scrollbar::-webkit-scrollbar-track {
            background: var(--scrollbar-bg);
            border-radius: 9999px;
        }

        .organizer-scrollbar::-webkit-scrollbar-thumb {
            background-color: var(--scrollbar-accent);
            border-radius: 9999px;
        }

        .organizer-scrollbar::-webkit-scrollbar-thumb:hover {
            filter: brightness(0.5);
        }
    `;

    return (
        <>
            <style>{scrollbarStyles}</style>
            <div
                ref={scrollRef}
                className={`organizer-scrollbar w-full min-w-0 overflow-x-auto ${className}`}
                style={
                    {
                        "--scrollbar-bg": backgroundColor,
                        "--scrollbar-accent": accentColor,
                    } as CSSProperties
                }
            >
                {children}
            </div>
        </>
    );
}