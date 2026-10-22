/*
 * Color themes
 * The standard theme is defined via the global.css
 * Add different color themes here, replace the attributes with the color you want for said component
 */



//dont forget to add new entries from the global.css beneath

export const THEME_TOKENS = [
    "background", 
    "header", 
    "sidebar", 
    "stripline", 
    "button-bg",
    "textfield",
    "searchbar", 
    "text", 
    "text-muted", 
    "text-search", 
] as const;


export type ThemeToken = (typeof THEME_TOKENS)[number];

export type Theme = Partial<Record<ThemeToken, string>>;


//these are only examples
export const themes = {
    sunset: {
        background: "#1B0F1E",
        header: "#7A2E4D",
        sidebar: "#2B1530",
        stripline: "#FFB16C",
        "button-bg": "#7A2E4D",
        textfield: "#FFE9D6",
        searchbar: "FFE9D6",
        text: "#FFE9D6",
        "text-muted": "#D9A5A0",
        "text-search": "#3A1226",
    },
    
    forest: {
        background: "#0D1A12",
        header: "#1F4D36",
        sidebar: "#153326",
        stripline: "#C9E4B5",
        "button-bg": "#1F4D36",
        textfield: "#EEF5D8",
        searchbar: "E8F3E1",
        text: "#E8F3E1",
        "text-muted": "#A3C4A8",
        "text-search": "#0D1A12",
    },
} satisfies Record<string, Theme>;


export type ThemeId = keyof typeof themes;

export const isThemeId = (id: string): id is ThemeId =>
  Object.hasOwn(themes, id);