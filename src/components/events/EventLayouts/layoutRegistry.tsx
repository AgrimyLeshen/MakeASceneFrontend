import type { ComponentType } from "react";
import type { Post } from "../../../testdata/EventPostData";

import BasicLayout from "./Basic/BasicLayout";
import TicketLayout from "./Ticket/TicketLayout";
import GraficLayout from "./Grafic/GraficLayout";
import TheatricLayout from "./Theatric/TheatricLayout";

type EventLayoutProps = {
    post: Post;
};

export const layoutRegistry: Record<
    Post["layoutType"],
    ComponentType<EventLayoutProps>
> = {
    basic: BasicLayout,
    ticket: TicketLayout,
    grafic: GraficLayout,
    theatric: TheatricLayout,
};