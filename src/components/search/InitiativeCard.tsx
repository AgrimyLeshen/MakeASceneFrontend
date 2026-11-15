"use client";

import Link from "next/link";
import type { Route } from "next";
import type { Initiative } from "@/components/search/Search";
import { FavoriteButton, MoreButton } from "@/components/search/CardActions";
import EventPreview from "./EventPreview";

/** Sizes use cqw (container query width), so the card scales with the width the grid gives it. */
export default function InitiativeCard({ initiative }: { initiative: Initiative }) {
  const name = initiative.name ?? "Unnamed";
  const [first, second] = initiative.events;

  return (

    <article className="relative flex w-full flex-col overflow-hidden rounded-md bg-header text-text [container-type:inline-size]">
        <div className="relative aspect-[3/1] w-full bg-background">

            <img src={initiative.banner} alt="" loading="lazy" className="h-full w-full object-cover" />

            <div className="absolute right-1 top-1 z-20 flex text-icons [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.6))]">
                <FavoriteButton initial={false} label={name} />
                <MoreButton label={name} />
            </div>
        </div>

        <div className="flex flex-col px-[4cqw] pb-[4cqw]">
            <img
                src={initiative.picture}
                alt=""
                className="mx-auto -mt-[8cqw] h-[16cqw] w-[16cqw] z-10 shrink-0 rounded-lg border-2 border-header bg-background object-cover"
            />

            <Link
                href={`/initiative/${initiative.id}` as Route}
                className="mt-[1.5cqw] truncate text-[clamp(11px,6cqw,18px)] text-text font-semibold after:pointer-events-none after:absolute after:inset-0 after:content-['']"
            >
                {name}
            </Link>

            <p className="line-clamp-2 min-w-0 h-7 py-0.5 text-[clamp(8px,3.8cqw,13px)] leading-snug text-text-muted">{initiative.description}</p>

            {first && (
                <div className="mt-[3cqw] flex h-[42cqw] gap-[2cqw]">
                    <div className="h-full flex-[2] overflow-hidden rounded-sm">
                        <EventPreview post={first} />
                    </div>
                    {second && (
                        <div className="h-full flex-1 overflow-hidden rounded-sm">
                            <EventPreview post={second} />
                        </div>
                    )}
                </div>
            )}
        </div>
    </article>
  );
}