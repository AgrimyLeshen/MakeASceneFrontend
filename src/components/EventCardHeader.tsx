"use client";

import { useState } from "react";
import Image from "next/image";
import type { Post } from "../testdata/EventPostData";
import "../css/EventCardHeader.css";

import calendarIcon from "../app/oldJsVersion/assets/addCalendar.png";
import heartFilled from "../app/oldJsVersion/assets/heartFilled.png";
import heartOutline from "../app/oldJsVersion/assets/heartOutline.png";

type EventCardHeaderProps = {
    post: Post;
};

export default function EventCardHeader({
    post,
}: EventCardHeaderProps) {
    const [isFav, setIsFav] = useState(post.isFavorite);

    function toggleFavorite() {
        setIsFav((prev) => !prev);
    }

    return (
        <div className="event-header">
            <div className="event-header-left">
                <img
                    src={post.initiativePP}
                    alt={post.initiativeName}
                    className="event-header-image"
                />

                <span className="event-header-title">
                    {post.initiativeName}
                </span>
            </div>

            <div className="event-header-actions">
                <button
                    type="button"
                    onClick={toggleFavorite}
                    aria-label={
                        isFav ? "Remove favorite" : "Add favorite"
                    }
                >
                    <Image
                        src={isFav ? heartFilled : heartOutline}
                        alt=""
                        className="icon"
                    />
                </button>

                <button
                    type="button"
                    aria-label="Add to calendar"
                >
                    <Image
                        src={calendarIcon}
                        alt=""
                        className="icon"
                    />
                </button>

                <button
                    type="button"
                    aria-label="More options"
                >
                    ⋯
                </button>
            </div>
        </div>
    );
}