import React from "react";
import "./LayoutSplit.css";

export default function LayoutSplit({ event }) {
  return (
    <div className="split-container">
      <div
        className="split-image"
        style={{ backgroundImage: `url(${event.banner})` }}
      />

      <div className="split-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <div className="accent-bar" />
      </div>
    </div>
  );
}