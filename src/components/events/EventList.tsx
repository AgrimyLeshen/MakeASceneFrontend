
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import EventCard from "./EventCard";

interface EventListProps {
  events: any[];
}

function getColumnCount(width: number): number {
    const minCardWidth = 280;
    const gap = 16;

    return Math.max(
        1,
        Math.floor((width + gap) / (minCardWidth + gap))
    );
}

function distributeToColumns(items: any[], columnCount: number) {
    const columns: any[][] = Array.from(
        { length: columnCount },
        () => []
    );

    items.forEach((item, index) => {
        columns[index % columnCount].push(item);
    });

    return columns;
}

function useContainerWidth() {
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const observer = new ResizeObserver(() => {
        setWidth(element.getBoundingClientRect().width);
        });

        observer.observe(element);

        setWidth(element.getBoundingClientRect().width);

        return () => observer.disconnect();
    }, []);

    return { containerRef, width };
}

export default function EventList({ events }: EventListProps) {
    const { containerRef, width } = useContainerWidth();

    const columns = useMemo(() => {
        return distributeToColumns(
        events,
        getColumnCount(width)
        );
    }, [events, width]);

    return (
        <div ref={containerRef} className="w-full min-w-0">
            <div className="flex items-start justify-center gap-4">
                {columns.map((col, colIdx) => (
                <div
                    key={colIdx}
                    className="min-w-0 flex-1 max-w-[400px]"
                >
                    {col.map((event, idx) => (
                    <div key={event.id ?? idx} className="mb-4 w-full">
                        <EventCard post={event} />
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
}
