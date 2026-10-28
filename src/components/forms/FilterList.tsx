"use client";

import { Filter, FilterData, FilterState } from "./Filter";

type FilterListProps = {
  filters: FilterData[];
  onFilterChange?: (id: string, state: FilterState) => void;
};

export default function FilterList({ filters, onFilterChange }: FilterListProps) {
  return (
    <div className="flex flex-col gap-3">
      {filters.map((filter) => (
        <Filter key={filter.id} {...filter} onChange={onFilterChange} />
      ))}
    </div>
  );
}

/* Usage in a page, passing the list into your existing sidebar:

const filters: FilterData[] = [
  { id: "music", name: "Musik" },                                   // none
  { id: "sport", name: "Sport", selection: "include" },             // include
  { id: "ads", name: "Werbung", selection: "exclude" },             // exclude
  { id: "news", name: "News", mark: "subscribed", selection: "include" }, // subscribed + include
  { id: "talk", name: "Talk", mark: "subscribed", selection: "exclude" }, // subscribed + exclude
  { id: "spam", name: "Spam", mark: "blocked" },                    // blocked (always exclude)
];

<Sidebar>
  <FilterList filters={filters} onFilterChange={(id, state) => console.log(id, state)} />
</Sidebar>
*/