import type { Post } from "@/testdata/EventPostData";


/* GET /site_accounts item for initiatives as the API returns it */
export type SiteAccount = {
  id: number;
  creator_id: number;
  name?: string;
  layout: unknown[];
  picture: string;
  banner: string;
  colors: string[];
  contact: { type: string; adress: string }[];
  description: string;
};


export type Initiative = SiteAccount & { events: Post[] };

export type Tag = { id: number; name: string; parent?: number | null; events: Post[] };

export type TagSearchResult = { top: Tag[]; related: Tag[] };