"use client";

import { useState } from "react";
import Image from "next/image";
import type { Post } from "../../testdata/EventPostData";
import MaskIcon from "@/components/shared/MaskIcon";

import calendarIcon from "../../app/oldJsVersion/assets/addCalendar.png";
import heartFilled from "../../app/oldJsVersion/assets/heartFilled.png";
import heartOutline from "../../app/oldJsVersion/assets/heartOutline.png";

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
        <div className="flex items-center justify-between bg-event-header p-1.5 [container-type:inline-size]">
            <div className="flex min-w-0 items-center text-event-header-text gap-[2cqw]">
                <img
                    src={post.initiativePP}
                    alt={post.initiativeName}
                    className="aspect-square w-[7cqw] shrink-0 rounded-sm object-cover"
                />

                <span className="min-w-0 font-semibold leading-[1.1] text-[clamp(8px,3.6cqw,20px)]">
                    {post.initiativeName}
                </span>
            </div>

            <div className="flex shrink-0 gap-[2.5cqw]">
                <button
                    type="button"
                    onClick={toggleFavorite}
                    aria-label={isFav ? "Remove favorite" : "Add favorite"}
                    className={`flex aspect-square h-[7cqw] cursor-pointer items-center justify-center border-0 bg-transparent
                    ${isFav ? "text-notification" : "text-event-header-icons hover:text-icons-dark"}`}
                >
                    <MaskIcon src={(isFav ? heartFilled : heartOutline).src} />
                </button>

                <button
                    type="button"
                    aria-label="Add to calendar"
                    className="flex aspect-square w-[7cqw] items-center justify-center text-event-header-icons hover:text-icons-dark border-0 bg-transparent cursor-pointer"
                >
                    <MaskIcon src={calendarIcon.src} />
                </button>

                <button
                    type="button"
                    aria-label="More options"
                    className="flex aspect-square w-[7cqw] items-center justify-center border-0 bg-transparent text-[clamp(12px,5cqw,20px)] text-event-header-icons cursor-pointer"
                >
                    ⋯
                </button>
            </div>
        </div>
    );
}