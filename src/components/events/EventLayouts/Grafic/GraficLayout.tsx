import type { Post } from "../../../../testdata/EventPostData";
import { formatDate, formatTime } from "@/utils/PostDateTime";

export default function TicketLayout({ post }: { post: Post }) {
    return(
        <div className="relative isolate w-full bg-clip-padding overflow-hidden [aspect-ratio:1/0.55] [container-type:inline-size] bg-[var(--color-primary)] font-sans text-[var(--color-tertiary)]">
            <div className="absolute h-full inset-x-0 grid grid-cols-[56%_44%] justify-items-center gap-[1cqw] px-2 pt-[4cqw] text-[clamp(6px,3cqw,16px)]">
                <div className="flex min-w-0 h-full gap-1 flex-col text-center leading-[1]">
                    <div className="font-semibold leading-none">
                        <div className="whitespace-nowrap text-[clamp(14px,6cqw,24px)]">
                            {formatTime(post.time)}
                        </div>
                        <div className="whitespace-nowrap text-[clamp(8px,3cqw,20px)]">
                            {formatDate(post.date)}
                        </div>
                    </div>

                    <p className="flex justify-center gap-[1cqw] text-[clamp(8px,3cqw,10px)] text-[var(--color-secondary)]">
                        <span className="shrink-0 text-[1.25em] leading-none">⌖</span>
                        <span>{post.location}</span>
                    </p>

                    <h2 className="text-[clamp(14px,6cqw,24px)] p-[1cqw] font-extrabold leading-none">
                        {post.name}
                    </h2>

                    <div className="mt-auto bg-[var(--color-secondary)] text-[var(--color-primary)] mx-[1cqw] px-[2cqw] pt-[2cqw] text-center leading-[1.1]">
                        <p className="mb-[3cqw] mt-0 text-[clamp(8px,3cqw,16px)]">
                            {post.description}
                        </p>
                    </div>
                </div>

                <div className="relative h-full w-full min-w-0">
                    <div className="absolute right-[-8px] top-[2cqw] w-[90%] h-[27.5cqw] bg-[var(--color-secondary)] z-0" />
                    <div className="relative flex min-w-0 h-full gap-3 flex-col text-center leading-[1.25]">
                        <img
                            className="relative aspect-square pr-[6cqw] pt-[3cqw] h-[35cqw] object-cover z-1"
                            src={post.image}
                            alt={post.name}
                        />
                        <div className="relative flex flex-wrap gap-x-[1cqw] leading-none justify-center text-[clamp(5px,2cqw,10px)]">
                            {post.tags.map((tag) => (
                                <span key={tag}>#{tag} </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}