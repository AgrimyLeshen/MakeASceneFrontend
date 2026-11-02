/*
 * Color themes
 * The standard theme is defined via the global.css
 * Add different color themes here, replace the attributes with the color you want for said component
 *
 * A theme only has to set the tokens it wants to change, everything else falls back to the
 * standard theme. Tokens marked "derived" below follow other tokens automatically (see global.css),
 * so most themes can leave them out.
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

    // filters
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

    // filters, derived (optional): follow text / icons / filter-button-bg unless set
    "filter-text",
    "filter-default-check-bg",
    "filter-default-x-bg",
    "filter-default-check",
    "filter-default-x",
    "filter-include-check",
    "filter-exclude-x",
] as const;


export type ThemeToken = (typeof THEME_TOKENS)[number];

/** Only "#rrggbb"-style values are accepted, so a forgotten "#" is a compile error. */
export type Color = `#${string}`;

export type Theme = Partial<Record<ThemeToken, Color>>;


//these are only examples
export const themes = {
    sunset: {
        background: "#1B0F1E",
        header: "#7A2E4D",
        sidebar: "#2B1530",
        stripline: "#FFB16C",
        "button-bg": "#7A2E4D",
        textfield: "#7A2E4D",
        searchbar: "#FFE9D6",
        notification: "#EF5345",
        icons: "#FFE9D6",
        "icons-dark": "#D9A5A0",
        "icons-light": "#C4687F",
        text: "#FFE9D6",
        "text-muted": "#D9A5A0",
        "text-search": "#3A1226",

        "filter-default-bg": "#7A2E4D",
        "filter-button-bg": "#933B5E",
        "filter-include-bg": "#4A5F3C",
        "filter-include-check-bg": "#9CCB5B",
        "filter-include-check-border": "#6E8F3F",
        "filter-include-x-bg": "#33402A",
        "filter-include-x": "#8C8C80",
        "filter-exclude-bg": "#3A2236",
        "filter-exclude-check-bg": "#2A1530",
        "filter-exclude-x-bg": "#D6455D",
        "filter-exclude-x-border": "#5A2A44",
        "filter-exclude-check": "#9A8A8A",
    },

    forest: {
        background: "#0D1A12",
        header: "#1F4D36",
        sidebar: "#153326",
        stripline: "#C9E4B5",
        "button-bg": "#1F4D36",
        textfield: "#1F4D36",
        searchbar: "#E8F3E1",
        notification: "#FF6B5A",
        icons: "#E8F3E1",
        "icons-dark": "#A3C4A8",
        "icons-light": "#5E9C78",
        text: "#E8F3E1",
        "text-muted": "#A3C4A8",
        "text-search": "#0D1A12",

        "filter-default-bg": "#1F4D36",
        "filter-button-bg": "#2A6347",
        "filter-include-bg": "#2F6B3A",
        "filter-include-check-bg": "#5CCB6E",
        "filter-include-check-border": "#3F9150",
        "filter-include-x-bg": "#173B26",
        "filter-include-x": "#7D8F80",
        "filter-exclude-bg": "#33283A",
        "filter-exclude-check-bg": "#211A2E",
        "filter-exclude-x-bg": "#B8394F",
        "filter-exclude-x-border": "#4F2A3E",
        "filter-exclude-check": "#808A82",
    },

    midnight: {
        background: "#0B0A1F",
        header: "#2B2A6B",
        sidebar: "#16153A",
        stripline: "#3B3A8F",
        "button-bg": "#2B2A6B",
        textfield: "#2B2A6B",
        searchbar: "#E8E8FF",
        notification: "#FF5A7A",
        icons: "#E8E8FF",
        "icons-dark": "#A9A8D6",
        "icons-light": "#6F6FC9",
        text: "#E8E8FF",
        "text-muted": "#A9A8D6",
        "text-search": "#0B0A1F",

        "filter-default-bg": "#2B2A6B",
        "filter-button-bg": "#34338A",
        "filter-include-bg": "#1F5A63",
        "filter-include-check-bg": "#3DD6B0",
        "filter-include-check-border": "#2A9C86",
        "filter-include-x-bg": "#143C44",
        "filter-include-x": "#808098",
        "filter-exclude-bg": "#3A2250",
        "filter-exclude-check-bg": "#1A1038",
        "filter-exclude-x-bg": "#C2347A",
        "filter-exclude-x-border": "#52244A",
        "filter-exclude-check": "#8888A0",
    },
} satisfies Record<string, Theme>;


export type ThemeId = keyof typeof themes;

export const isThemeId = (id: string): id is ThemeId =>
  Object.hasOwn(themes, id);