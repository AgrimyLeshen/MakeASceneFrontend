"use client";

import { Filter, FilterData, FilterState } from "./Filter";

type FilterListProps = {
  filters: FilterData[];
  onFilterChange?: (id: string, state: FilterState) => void;
};

export default function FilterList({ filters, onFilterChange }: FilterListProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      {filters.map((filter) => (
        <Filter key={filter.id} {...filter} onChange={onFilterChange} />
      ))}
    </div>
  );
}
