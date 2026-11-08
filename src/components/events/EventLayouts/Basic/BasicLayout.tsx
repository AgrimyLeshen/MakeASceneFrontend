import type { Post } from "../../../../testdata/EventPostData";
import { formatDate, formatTime } from "@/utils/PostDateTime";
import styles from "./BasicLayout.module.css";


export default function BasicLayout({ post }: { post: Post }) {
    return (
        <div className={`relative isolate w-full overflow-hidden bg-clip-padding [aspect-ratio:1/0.9] [container-type:inline-size] font-sans font-semibold text-[var(--color-tertiary)] bg-event-header ${styles.layout}`}>
            <img
                className="absolute -inset-0 -z-[2] h-full w-full object-cover object-center"
                src={post.image}
                alt={post.name}
            />

            <div className={styles.topShape} />

            <div className={styles.transitionShape} />

            <div className={`absolute pl-4 pr-6 top-4 z-[2] ${styles.heading}`}>
                <h2 className="mb-[0.3em] overflow-wrap-anywhere text-[var(--color-tertiary)] text-[clamp(8px,7cqw,37px)] font-sans font-extrabold leading-[1]">
                    {post.name}
                </h2>
                <p className="m-0 max-w-[50%] text-[clamp(8px,4cqw,21px)] leading-[1.1] tracking-[0.03em]">
                    {post.slogan}
                </p>
            </div>

            <div className={styles.bottomTriangle} />

            <div className="absolute inset-x-0 bottom-0 grid grid-cols-[44%_56%] items-end gap-[2cqw] px-[2cqw] text-[clamp(4px,3cqw,16px)] [box-sizing:border-box]">
                <div className="min-w-0 leading-[1.25] p-[2cqw] [overflow-wrap:anywhere]">
                    <p className="mb-[7px] mt-0 flex items-start gap-[5px]">
                        <span className="shrink-0 leading-none">◷</span>
                        <span>
                            {formatTime(post.time)}
                            <br />
                            {formatDate(post.date)}
                        </span>
                    </p>

                    <p className="mb-[7px] mt-0 flex items-start gap-[5px]">
                        <span className="shrink-0 leading-none">⌖</span>
                        <span>{post.location}</span>
                    </p>
                </div>

                <div className={`relative min-w-0 self-stretch box-border bg-[var(--color-secondary)] p-[2cqw] pb-[4cqw] mr-[2cqw] leading-[1.35] [overflow-wrap:anywhere]`}>
                    <p className="mb-[1.5cqw] mt-0">{post.description}</p>

                    <div className="flex flex-wrap gap-x-[1.5cqw] leading-none text-[clamp(4px,2cqw,14px)]">
                        {post.tags.map((tag) => (
                            <span key={tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}