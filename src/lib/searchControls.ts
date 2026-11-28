/**
 * What a search page can ask SearchControls to show.
 * Plain data only, so server pages can pass it to the client component.
 */

export type SelectOption = { value: string; label: string };

export type SelectControl = {
  type: "select";
  param: string;
  label: string;
  options: SelectOption[];
  /** value used when the param is absent; not written to the URL */
  defaultValue: string;
};

export type TextControl = {
  type: "text";
  param: string;
  label: string;
  placeholder: string;
};

export type SearchControl = SelectControl | TextControl;


export const SORT = {
  upcoming: { value: "upcoming", label: "Upcoming" },
  newest: { value: "newest", label: "Newest" },
  alphabetical: { value: "alphabetical", label: "Alphabetical A–Z" },
  relevance: { value: "relevance", label: "Relevance" },
} satisfies Record<string, SelectOption>;