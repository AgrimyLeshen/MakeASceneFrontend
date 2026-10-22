export type DateValue =
    | { type: "single"; value: string }
    | { type: "range"; from: string; to: string };

export type TimeValue =
    | { type: "single"; value: string }
    | { type: "range"; from: string; to: string };

export type AccessOption = {
    name: string;
    selected: boolean;
};

export type Post = {
    id: string;
    layoutType: "basic";
    name: string;
    location: string;
    date: DateValue;
    time: TimeValue;
    access: AccessOption[];
    tags: string[];
    image: string;
    colors: [string, string, string];
    slogan: string;
    description: string;
    initiativeName: string;
    initiativePP: string;
    isFavorite: boolean;
};

export const testPosts: Post[] = [
    {
        id: "post-001",
        layoutType: "basic",
        name: "Summer Garden Festival",
        location: "Stadtpark, Nuremberg",
        date: {
            type: "range",
            from: "18.07.2026",
            to: "19.07.2026",
        },
        time: {
            type: "range",
            from: "10:00",
            to: "22:00",
        },
        access: [
            { name: "Wheelchair accessible", selected: true },
            { name: "Public transport nearby", selected: true },
            { name: "Free entry", selected: false },
            { name: "Family friendly", selected: true },
            { name: "Pet friendly", selected: false },
        ],
        tags: ["Music", "Outdoors", "Food", "Community"],
        image: "/images/PostBG.jpg",
        colors: ["#245C45", "#506352", "#F7F3E8"],
        slogan: "Good music. Green spaces. Great company.",
        description:
        "Spend a summer weekend surrounded by greenery, live music, " +
        "local food vendors, and creative workshops. Bring your friends " +
        "and family for a relaxed celebration of community and nature.",
        initiativeName: "Green Hearts Collective",
        initiativePP: "/images/image.png",
        isFavorite: true,
    },

    {
        id: "post-002",
        layoutType: "basic",
        name: "Creative Meetup",
        location: "Kreativzentrum, Nuremberg",
        date: {
            type: "single",
            value: "05.11.2026",
        },
        time: {
            type: "single",
            value: "18:30",
        },
        access: [
            { name: "Wheelchair accessible", selected: true },
            { name: "Public transport nearby", selected: true },
            { name: "Free entry", selected: true },
            { name: "Family friendly", selected: false },
            { name: "Pet friendly", selected: false },
        ],
        tags: ["Design", "Networking", "Creative"],
        image: "/images/PostBG.jpg",
        colors: ["#593C8F", "#E6AACE", "#FFF4E9"],
        slogan: "Meet minds. Make things.",
        description:
        "An informal evening for designers, artists, developers, and " +
        "curious minds. Share current projects, exchange ideas, and " +
        "meet people who enjoy turning concepts into reality.",
        initiativeName: "Creative Minds Nuremberg",
        initiativePP: "/images/image.png",
        isFavorite: false,
    },

    {
        id: "post-003",
        layoutType: "basic",
        name: "Morning at the Lake",
        location: "Dutzendteich, Nuremberg",
        date: {
            type: "single",
            value: "24.10.2026",
        },
        time: {
            type: "range",
            from: "07:00",
            to: "11:00",
        },
        access: [
            { name: "Wheelchair accessible", selected: false },
            { name: "Public transport nearby", selected: true },
            { name: "Free entry", selected: true },
            { name: "Family friendly", selected: true },
            { name: "Pet friendly", selected: true },
        ],
        tags: ["Nature", "Wellbeing", "Morning"],
        image: "/images/PostBG.jpg",
        colors: ["#e01a1a", "#fd9d2f", "#0f0b1b"],
        slogan: "Start slow. Feel everything.",
        description:
        "Enjoy a peaceful morning by the water with scenic walking " +
        "paths, fresh air, and plenty of space to unwind. Bring a " +
        "coffee, take a stroll, and start the day at your own pace.",
        initiativeName: "Slow Mornings Club",
        initiativePP: "/images/image.png",
        isFavorite: true,
    },
];