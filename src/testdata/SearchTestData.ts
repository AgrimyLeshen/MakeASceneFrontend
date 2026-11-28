import { testPosts, type Post } from "@/testdata/EventPostData";
import type { Initiative, Tag, TagSearchResult } from "@/lib/Search";

/** n events starting at `start`, cycling through testPosts (so every layout shows up) */
const pick = (start: number, n: number): Post[] =>
  Array.from({ length: n }, (_, i) => testPosts[(start + i) % testPosts.length]);

/* ---------------- initiatives ---------------- */

const initiativeNames: [name: string, description: string, colors: string[]][] = [
  ["Coole Bar", "Wir sind eine coole Bar", ["#124559", "#598392", "#EFF6E0"]],
  ["CreativeNews", "Neuigkeiten aus der Kreativszene", ["#593C8F", "#E6AACE", "#FFF4E9"]],
  ["Alef Morais", "Live music and good vibes", ["#02111f", "#1a92b1", "#00eeff"]],
  ["PixelForge Con", "Play. Compete. Connect.", ["#0e1029", "#ffddb7", "#ffc038"]],
  ["Green Hearts Collective", "Good music. Green spaces. Great company.", ["#245C45", "#506352", "#F7F3E8"]],
  ["Slow Mornings Club", "Start slow. Feel everything.", ["#e01a1a", "#fd9d2f", "#0f0b1b"]],
  ["Creative Minds Nuremberg", "Meet minds. Make things.", ["#593C8F", "#E6AACE", "#FFF4E9"]],
  ["Kulturwerkstatt Hof", "Workshops, Konzerte und mehr", ["#124559", "#598392", "#EFF6E0"]],
  ["Studio 7", "Ein sehr langer Beschreibungstext, der in der Karte abgeschnitten werden sollte aaaaaaaaaaaaaaaaa", ["#02111f", "#1a92b1", "#00eeff"]],
  ["Theater am Fluss", "Every story deserves a spotlight", ["#0e1029", "#ffddb7", "#ffc038"]],
  ["Nachtschicht", "Clubnächte in Bayreuth", ["#332b43", "#a81e49", "#eff6e0"]],
];

export const testInitiatives: Initiative[] = initiativeNames.map(([name, description, colors], i) => ({
  id: i + 1,
  creator_id: 100 + i,
  name,
  layout: [],
  picture: "/images/image.png",
  banner: "/images/PostBG.jpg",
  colors,
  contact: [{ type: "website", adress: `https://example.com/${i + 1}` }],
  description,
  events: pick(i, 2),
}));

/* ---------------- tags ---------------- */

const tagNames = [
  "Musik", "Musik Konzert", "Musik Gruppe", "Musiker", // top
  "Rock", "Konzert", "Pop", "Band", "Funk", "Song", "Jazz", "Festival", // related
];

const allTags: Tag[] = tagNames.map((name, i) => ({
  id: i + 1,
  name,
  parent: i < 4 ? null : 1,
  events: pick(i, 3),
}));

export const testTagResult: TagSearchResult = {
  top: allTags.slice(0, 4),
  related: allTags.slice(4),
};