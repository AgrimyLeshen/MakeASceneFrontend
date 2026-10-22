"use client";

import { useMemo, useState, useEffect } from "react";
import EventCard from "../../../components/events/EventCard";
import "../css/EventList.css";

function getColumnCount(width) {
  if (width <= 700) return 1;
  if (width <= 1000) return 2;
  if (width <= 1500) return 3;
  return 4;
}

function distributeToColumns(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);

  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });

  return columns;
}

export function useWindowWidth() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Get the initial width in the browser
    handleResize();

    // Update width when the browser window changes size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return width;
}

export default function EventList({ events }) {
  const width = useWindowWidth();

  const columns = useMemo(() => {
    const columnCount = getColumnCount(width);
    return distributeToColumns(events, columnCount);
  }, [events, width]);

  return (
    <div className="feed">
      <div className="eventBlock" style={{ display: "flex", gap: "16px" }}>
        {columns.map((col, colIdx) => (
          <div key={colIdx} style={{ flex: 1 }}>
            {col.map((event, idx) => (
              <div key={event.id ?? idx} className="event-wrapper">
                <EventCard post={event} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
