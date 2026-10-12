"use client";
import { useState } from "react";
import Image from "next/image";
import '../css/EventCardHeader.css';
import calendarIcon from '../assets/addCalendar.png';
import heartFilled from '../assets/heartFilled.png';
import heartOutline from '../assets/heartOutline.png';

function EventCardHeader({event}){
    const [isFav, setIsFav] = useState(event.isFavorite);

    function toggleFavorite() {
        setIsFav(!isFav);
    }
    
    return (
        <div className="event-header">
            <div className="event-header-left">
                <img
                src={event.initiativeImage}
                alt={event.initiativeName}
                className="event-header-image"
                />
                <span className="event-header-title">
                {event.initiativeName}
                </span>
            </div>

            <div className="event-header-actions">
                <button type="button" onClick={toggleFavorite}>
                <Image
                    src={isFav ? heartFilled : heartOutline}
                    alt={isFav ? "Remove favorite" : "Add favorite"}
                    className="icon"
                />
                </button>

                <button type="button" aria-label="Add to calendar">
                <Image src={calendarIcon} alt="" className="icon" />
                </button>

                <button type="button" aria-label="More options">⋯</button>
            </div>
        </div>
    );
}

export default EventCardHeader;