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
            className="flex w-full min-w-[225px] max-w-[400px] flex-col items-stretch overflow-hidden rounded-[5px] bg-[rgb(31,31,31)] text-[10px] transition-[transform,box-shadow] duration-200 ease-in-out hover:scale-[1.02] hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
            style={{
                "--color-primary": post.colors[0],
                "--color-secondary": post.colors[1],
                "--color-tertiary": post.colors[2],
            } as React.CSSProperties}
        >
            <EventCardHeader post={post} />

            <div className="flex min-h-0 flex-1">
                <Layout post={post} />
            </div>
        </article>
    );
}