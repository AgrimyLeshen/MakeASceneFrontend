import type {Post} from "./EventPostData";
import {testPosts} from "./EventPostData";

export type Sections = {
    layout_variant: number;
    data: {
        title?: string[];
        text?: string[];
        image?: string[];
        events?: Post[];
    };
};

export type OrganizerInfo = {
    id: string;
    name: string;
    profilePic: string;
    subscribed: boolean;
    notification: boolean;
    colors: [string, string, string];
    location: string;
    contactInfo: string;
    website: string;
    banner: string;
    description: string;
    events: Post[];
    sections: Sections[];
};

export const organizerTestData: OrganizerInfo = {
    id: "initiative-001",
    name: "Green Future Initiative",
    profilePic: "/images/image.png",
    subscribed: true,
    notification: false,
    colors: ["#022a66", "#940000", "#F7F3E8"],
    location: "Berlin, Germany",
    contactInfo: "contact@greenfuture.example",
    website: "https://greenfuture.example",
    banner: "/images/PostBG.jpg",
    description:
        "A community initiative dedicated to sustainability, environmental awareness, and a greener future.",

    events: testPosts,
    sections: [
        {
            layout_variant: 0,
            data: {
                title: [
                    "Welcome to Green Future!",
                ],
                text: [
                    "Together, we can make our communities more sustainable. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.", 
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
                ],
            },
        },
        {
            layout_variant: 1,
            data: {
                image: [
                    "/images/image.png",
                    "/images/PostBG.jpg",
                    "/images/image.png",
                    "/images/image.png",
                    "/images/image.png",
                ],
            },
        },
        {
            layout_variant: 2,
            data: {
                title: ["Game Night every Friday!"],
                text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."],                
                events: testPosts,
            },
        },
        {
            layout_variant: 3,
            data: {
                title: ["Get involved in our next community project!"],
                text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."],                
                image: ["/images/image.png"],
            },
        },
        {
            layout_variant: 4,
            data: {
                title: ["Our Team"],
                text: ["Max Mustermann|Team Lead", "Max Mustermann", "Max Mustermann", "Max Mustermann", "Max Mustermann"],                
                image: [
                    "/images/image.png",
                    "/images/image.png",
                    "/images/image.png",
                    "/images/image.png",
                    "/images/image.png",
                ],
            },
        },
        {
            layout_variant: 5,
            data: {
                title: ["Get involved in our next community project!"],
                text: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."],                
                image: ["/images/image.png"],
            },
        },
        {
            layout_variant: 6,
            data: {
                title: ["Buy our Merch now!"],
                text: ["Store|https://www.youtube.com/watch?v=xvFZjo5PgG0"],
                image: [ //images can be removed
                    "/images/image.png",
                    "/images/PostBG.jpg",
                ],
            },
        },
        {
            layout_variant: 7,
            data: {
                title: ["Super cool shit!"],
                text: ["Sign up|https://www.youtube.com/watch?v=xvFZjo5PgG0"],                
                image: ["/images/PostBG.jpg"],
            },
        },
    ],
};