import type { ComponentType } from "react";
import type { Post } from "../../../testdata/EventPostData";

import BasicLayout from "./Basic/BasicLayout";

type EventLayoutProps = {
    post: Post;
};

export const layoutRegistry: Record<
    Post["layoutType"],
    ComponentType<EventLayoutProps>
> = {
    basic: BasicLayout,
};