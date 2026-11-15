import type { Post } from "@/testdata/EventPostData";
import EventCardHeaderless from "../events/EventCardHeaderless";


/*An event card used as a thumbnail*/

export default function EventPreview({ post }: { post: Post }) {
  return (
    <div inert aria-hidden="true" className="pointer-events-none w-full">
      <EventCardHeaderless post={post} />
    </div>
  );
}