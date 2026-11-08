import type { Post } from "../../../../testdata/EventPostData";
import { formatDate, formatTime } from "@/utils/PostDateTime";

export default function TicketLayout({ post }: { post: Post }) {
    return(
        <div className={`relative isolate w-full overflow-hidden bg-clip-padding [aspect-ratio:1/0.45] [container-type:inline-size] font-[Tahoma,sans-serif] text-[var(--color-tertiary)] bg-[var(--color-primary)]`}>
            <div className="absolute inset-y-0 left-0 z-[2] flex w-[8%] flex-col items-center justify-between border-r-1 border-[var(--color-tertiary)]">
                <div className="aspect-square w-[30%] rounded-full border-1 border-[var(--color-tertiary)] bg-transparent" />
                <div className="aspect-square w-[30%] rounded-full border-1 border-[var(--color-tertiary)] bg-transparent" />
                <div className="aspect-square w-[30%] rounded-full border-1 border-[var(--color-tertiary)] bg-transparent" />
                <div className="aspect-square w-[30%] rounded-full border-1 border-[var(--color-tertiary)] bg-transparent" />
                <div className="aspect-square w-[30%] rounded-full border-1 border-[var(--color-tertiary)] bg-transparent" />
            </div>
            <div className="absolute h-full left-[10%] right-[32%] p-1 min-w-0 flex flex-col justify-between">
                <h2 className="overflow-wrap-anywhere text-[clamp(8px,5cqw,26.67px)] font-[Tahoma,sans-serif] font-extrabold leading-[1.00] text-[var(--color-tertiary)]">
                    {post.name}
                </h2>
                <div className="ml-auto w-[90%] text-right leading-[1.1] tracking-[0.03em] text-[var(--color-secondary)]">
                    <p className="text-[clamp(8px,3cqw,16px)]">
                        {post.slogan}
                    </p>
                    <p className="flex justify-end gap-[3px] text-[clamp(8px,3cqw,10px)]">
                        <span className="shrink-0 text-[1.25em] leading-none text-[var(--color-tertiary)]">⌖</span>
                        <span>{post.location}</span>
                    </p>
                </div>
                <div className="min-w-0 font-[Tahoma,sans-serif] font-extrabold leading-none text-[var(--color-tertiary)]">
                    <div className="w-full whitespace-nowrap text-[clamp(8px,3cqw,10px)]">
                        {formatDate(post.date)}
                    </div>

                    <div className="w-full whitespace-nowrap text-[clamp(8px,3cqw,10px)]">
                        {formatTime(post.time)}
                    </div>
                </div>
                <p className="leading-none text-[var(--color-secondary)] text-[clamp(5px,2cqw,10px)]">
                    {post.tags.map((tag) => (
                        <span key={tag}>#{tag} </span>
                    ))}
                </p>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex w-[32%] p-1">
                <img
                    className="h-full w-full object-cover"
                    src={post.image}
                    alt={post.name}
                />
            </div>
            
        </div>
    );
}