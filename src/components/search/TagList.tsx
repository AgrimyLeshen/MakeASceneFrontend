"use client";

import type { Tag, TagSearchResult } from "@/lib/Search";
import HoneycombGrid from "@/components/shared//HoneyCombGrid";
import TagCard from "./TagCard";

function TagGroup({ title, tags }: { title: string; tags: Tag[] }) {

    if (!tags.length) return null;
    return (
        <section>
        <h2 className="mb-7 mt-4 text-[13px] font-bold text-text">{title}</h2>
        <HoneycombGrid items={tags} cardWidth={290} renderItem={(t) => <TagCard tag={t} />} />
        </section>
    );
}

export default function TagList({ result }: { result: TagSearchResult }) {
    
    if (!result.top.length && !result.related.length) {
        return <p className="py-10 text-center text-sm text-text-muted">No tags found.</p>;
    }

    return (
        <div className="flex flex-col gap-6 pb-10 pt-10">
        <TagGroup title="Top Tags" tags={result.top} />
        <TagGroup title="Related Tags" tags={result.related} />
        </div>
    );
}