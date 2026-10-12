import React from "react";
import "./LayoutHero.css";

export default function LayoutHero({ event }) {
  return (
    <div className="hero">
      <div
        className="hero-image"
        style={{
          backgroundImage: `url(${event.banner || event.initiativeImage})`,
        }}
      />

      <div className="hero-gradient" />

      <div className="hero-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>
      </div>
    </div>
  );
}