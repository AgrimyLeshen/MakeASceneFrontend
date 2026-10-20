import type { Post } from "../../testdata/EventPostData";
import EventCardHeader from "./EventCardHeader";
import { layoutRegistry } from "./EventLayouts/layoutRegistry";

type EventCardProps = {
    post: Post;
};

export default function EventCard({ post }: EventCardProps) {
    const Layout = layoutRegistry[post.layoutType];

    return (
        <article
            className="event-card"
            style={{
                "--color-primary": post.colors[0],
                "--color-secondary": post.colors[1],
                "--color-tertiary": post.colors[2],
            } as React.CSSProperties}
        >
            <EventCardHeader post={post} />

            <div className="event-card-body">
                <Layout post={post} />
            </div>
        </article>
    );
}