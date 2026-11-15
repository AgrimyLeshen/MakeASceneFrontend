
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function HoneycombGrid<T extends { id: string | number }>({items, cardWidth, gap = 12, renderItem,}: {
    items: T[];
    cardWidth: number;
    gap?: number;
    renderItem: (item: T) => ReactNode;
  }) {

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


  const columnCount = Math.max(
    1,
    Math.floor((width + gap) / (cardWidth + gap))
  );

  // Distribute items into alternating rows
  const rows: T[][] = [];
  let index = 0;
  let rowIndex = 0;

  while (index < items.length) {
    const rowSize =
      columnCount === 1
        ? 1
        : rowIndex % 2 === 0
          ? columnCount
          : columnCount - 1;

    rows.push(items.slice(index, index + rowSize));

    index += rowSize;
    rowIndex++;
  }

  return (
    <div
      ref={containerRef}
      className="flex w-full min-w-0 flex-col"
      style={{ gap }}
    >
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="flex justify-center"
          style={{ gap }}
        >
          {row.map((item) => (
            <div
              key={item.id}
              className="min-w-0 flex-none"
              style={{
                width: cardWidth,
                maxWidth: "100%",
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
