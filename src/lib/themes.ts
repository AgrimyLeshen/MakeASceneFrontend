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
    "notification",
    "icons",
    "icons-dark",
    "icons-light", 
    "text", 
    "text-muted", 
    "text-search",
    "filter-text",
    "filter-default-bg",
    "filter-button-bg",
    "filter-include-bg",
    "filter-include-check-bg",
    "filter-include-check-border",
    "filter-include-x-bg",
    "filter-include-x",
    "filter-exclude-bg",
    "filter-exclude-check-bg",
    "filter-exclude-x-bg",
    "filter-exclude-x-border",
    "filter-exclude-check",
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
        notification: "EF5345",
        icons: "FF5555",
        "icons-dark": "FFE9D6",
        "icons-light": "7E3544",
        text: "#FFE9D6",
        "text-muted": "#D9A5A0",
        "text-search": "#3A1226",
        "filter-default-bg": "#7A2E4D",
        "filter-button-bg": "#1B0F1E",
        "filter-include-bg": "#324242",
        "filter-include-check-bg": "#324242",
        "filter-include-check-border": "#453221",
        "filter-include-x-bg": "#FE4242",
        "filter-include-x": "#323422",
        "filter-exclude-bg": "#324242",
        "filter-exclude-check-bg": "#324242",
        "filter-exclude-x-bg": "#324242",
        "filter-exclude-x-border": "#324242",
        "filter-exclude-check": "#324242",
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