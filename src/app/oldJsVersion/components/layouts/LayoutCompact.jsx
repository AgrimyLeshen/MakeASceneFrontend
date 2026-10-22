import React from "react";
import "./LayoutCompact.css";

export default function LayoutCompact({ event }) {
  return (
    <div className="event-content compact">
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      {event.isNew && <span className="badge">NEW</span>}
    </div>
  );
}