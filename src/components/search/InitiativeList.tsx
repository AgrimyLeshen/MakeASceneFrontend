"use client";

import type { Initiative } from "@/components/search/Search";
import HoneycombGrid from "@/components/shared/HoneyCombGrid";
import InitiativeCard from "./InitiativeCard";

export default function InitiativeList({ initiatives }: { initiatives: Initiative[] }) {
    if (!initiatives.length) {
        return <p className="py-10 text-center text-sm text-text-muted">No initiatives found.</p>;
    }

 
    const top = initiatives.slice(0, 3);
    const rest = initiatives.slice(3);

    return (
        <div className="flex flex-col gap-3 pb-10">
            <HoneycombGrid items={top} cardWidth={420} renderItem={(i) => <InitiativeCard initiative={i} />} />
            {rest.length > 0 && (
                <HoneycombGrid items={rest} cardWidth={300} renderItem={(i) => <InitiativeCard initiative={i} />} />
            )}
        </div>
    );
}