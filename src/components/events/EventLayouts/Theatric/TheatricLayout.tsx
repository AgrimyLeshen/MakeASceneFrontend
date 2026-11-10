import type { Post } from "../../../../testdata/EventPostData";
import { formatDate, formatTime } from "@/utils/PostDateTime";

export default function TheatricLayout({ post }: { post: Post }) {
    return(
        <div className="relative isolate w-[calc(100%+2rem)] bg-clip-padding overflow-hidden [aspect-ratio:1/1] [container-type:inline-size] bg-event-header font-['Apple_Chancery',cursive] text-[var(--color-tertiary)]">
            <img
                className="absolute -inset-0 -z-[2] h-full w-full  object-cover object-center"
                src={post.image}
                alt={post.name}
            />
            <div className="flex min-w-0 h-full py-[4cqw] gap-[1cqw] flex-col text-center leading-[1]">
                <h2 className="text-[clamp(14px,6cqw,24px)] font-['Brush_Script_MT'] text-[var(--color-tertiary)] font-extrabold leading-none">
                    {post.slogan}
                </h2>
                <h2 className="text-[clamp(8px,7cqw,37px)] font-['Georgia',serif] text-[var(--color-secondary)] font-extrabold leading-none">
                    {post.name}
                </h2>
                <div className="mx-auto mt-auto p-[2cqw] flex flex-col aspect-square w-[55%] items-center justify-around rounded-full border-2 bg-[var(--color-primary)]/50 border-[var(--color-secondary)] text-center text-[var(--color-tertiary)] leading-[1.1]">
                    <p className="w-full break-all text-[clamp(14px,6cqw,24px)] font-['Georgia',serif] text-[var(--color-secondary)] font-extrabold leading-none text-center">
                        {formatTime(post.time).replace(" – ", "| – ").split("|").map((part, i) => (
                            <span key={i}>
                                {i > 0 && <br />}
                                {part}
                            </span>
                        ))}
                    </p>
                    <p className="text-[clamp(8px,7cqw,37px)] font-['Georgia',serif] text-[var(--color-secondary)] font-extrabold leading-none">
                        {formatTime(post.date)}
                    </p>
                    <p className="text-[clamp(8px,3cqw,16px)] p-[3cqw]">
                        {post.description}
                    </p>
                </div>
                <p className="leading-none mt-auto text-[var(--color-secondary)] text-[clamp(5px,2cqw,10px)]">
                    {post.tags.map((tag) => (
                        <span key={tag}>#{tag} </span>
                    ))}
                </p>
            </div>
        </div>
    );
}