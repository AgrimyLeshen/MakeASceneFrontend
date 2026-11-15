"use client";

import Link from "next/link";
import type { Route } from "next";
import type { Tag } from "@/components/search/Search";
import { FavoriteButton, MoreButton } from "./CardActions";
import EventPreview from "./EventPreview";


export default function TagCard({ tag }: { tag: Tag }) {

  const [a, b, c] = tag.events;

  return (
    <article className="relative flex w-full flex-col overflow-hidden rounded-md border-header border-2 bg-header text-text [container-type:inline-size]">
        <div className="flex items-center justify-between gap-2 px-[4cqw] py-[1.5cqw]">
            <Link
                href={`/search/events?include=tag:${tag.id}` as Route}
                className="min-w-0 truncate text-[clamp(11px,7cqw,18px)] font-bold after:absolute after:inset-0 after:content-['']"
            >
                #{tag.name}
            </Link>

            <div className="flex shrink-0 text-[0.9em]">
                <FavoriteButton initial={false} label={`#${tag.name}`} />
                <MoreButton label={`#${tag.name}`} />
            </div>
        </div>

        {/* mosaic: one big preview on the left, two stacked on the right */}
        <div className="grid h-[180px] w-full grid-cols-3 grid-rows-2 gap-px bg-background">
            {a && (
                <div className="col-span-2 row-span-2 overflow-hidden">
                    <EventPreview post={a} />
                </div>
            )}
            {b && (
                <div className="overflow-hidden">
                    <EventPreview post={b} />
                </div>
            )}
            {c && (
                <div className="overflow-hidden">
                    <EventPreview post={c} />
                </div>
            )}
        </div>
    </article>
  );
}