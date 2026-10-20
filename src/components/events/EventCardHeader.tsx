"use client";

import { useState } from "react";
import Image from "next/image";
import type { Post } from "../../testdata/EventPostData";

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
        <div className="flex items-center justify-between border-b border-black px-[14px] py-3 [container-type:inline-size]">
            <div className="flex min-w-0 items-center gap-[10px]">
                <img
                    src={post.initiativePP}
                    alt={post.initiativeName}
                    className="h-[30px] w-[30px] shrink-0 rounded-lg object-cover"
                />

                <span className="min-w-0 font-semibold leading-[1.3] text-[clamp(10px,3.6cqw,20px)]">
                    {post.initiativeName}
                </span>
            </div>

            <div className="flex shrink-0 gap-[3px]">
                <button
                    type="button"
                    onClick={toggleFavorite}
                    aria-label={
                        isFav ? "Remove favorite" : "Add favorite"
                    }
                    className="flex h-8 w-8 flex-[0_0_32px] items-center justify-center border-0 bg-transparent p-[2px] cursor-pointer"
                >
                    <Image
                        src={isFav ? heartFilled : heartOutline}
                        alt=""
                        className="h-5 w-5 object-contain"
                    />
                </button>

                <button
                    type="button"
                    aria-label="Add to calendar"
                    className="flex h-8 w-8 flex-[0_0_32px] items-center justify-center border-0 bg-transparent p-[2px] cursor-pointer"
                >
                    <Image
                        src={calendarIcon}
                        alt=""
                        className="h-5 w-5 object-contain"
                    />
                </button>

                <button
                    type="button"
                    aria-label="More options"
                    className="flex h-8 w-8 flex-[0_0_32px] items-center justify-center border-0 bg-transparent p-[2px] text-inherit cursor-pointer"
                >
                    ⋯
                </button>
            </div>
        </div>
    );
}