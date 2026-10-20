import type { Post } from "../../../../testdata/EventPostData";
import styles from "./BasicLayout.module.css";

function formatDate(date: Post["date"]) {
    if (date.type === "single") return date.value;
    const parseDate = (value: string) => {
        const [day, month, year] = value.split(".").map(Number);
        return {day, month, year};
    }
    const from = parseDate(date.from);
    const to = parseDate(date.to);

    if (from.month == to.month && from.year == to.year) {
        return `${from.day}. - ${to.day}.${String(to.month).padStart(2, "0")}.${to.year}`;
    }
    if (from.year == to.year) {
        return `${String(from.day).padStart(2, "0")}.${String(from.month).padStart(2, "0")}. - ${String(to.day).padStart(2, "0")}.${String(to.month).padStart(2, "0")}.${to.year}`;
    }
    return (
        <>
            {date.from} -
            <br />
            {date.to}
        </>
    );
}

function formatTime(time: Post["time"]) {
    if (time.type === "single") return time.value;
    return `${time.from} – ${time.to}`;
}

export default function BasicLayout({ post }: { post: Post }) {
    return (
        <div className={`relative isolate w-full overflow-hidden [aspect-ratio:1/0.96] [container-type:inline-size] font-[Arial,Helvetica,sans-serif] text-[var(--color-tertiary)] bg-[var(--color-primary)] ${styles.layout}`}>
            <img
                className="absolute -inset-0 -z-[2] h-full w-full object-cover object-center"
                src={post.image}
                alt={post.name}
            />

            <div className={styles.topShape} />

            <div className={styles.transitionShape} />

            <div className={`absolute left-[7%] right-[6%] top-[5%] z-[2] text-[var(--color-tertiary)] ${styles.heading}`}>
                <h2 className="mb-[0.3em] overflow-wrap-anywhere text-[clamp(12px,8cqw,30px)] font-extrabold leading-[1.05] text-[var(--color-tertiary)]">
                    {post.name}
                </h2>
                <p className="m-0 max-w-[50%] text-[clamp(10px,4cqw,12px)] leading-[1.1] tracking-[0.03em]">
                    {post.slogan}
                </p>
            </div>

            <div className={styles.bottomTriangle} />

            <div className="absolute inset-x-0 bottom-0 z-[1] grid grid-cols-[44%_56%] items-end gap-[5%] p-[3%] text-[var(--color-tertiary)] [box-sizing:border-box]">
                <div className="min-w-0 text-[clamp(8px,3.5cqw,18px)] leading-[1.25] [overflow-wrap:anywhere]">
                    <p className="mb-[7px] mt-0 flex items-start gap-[5px]">
                        <span className="shrink-0 text-[1.25em] leading-none">◷</span>
                        <span>
                            {formatTime(post.time)}
                            <br />
                            {formatDate(post.date)}
                        </span>
                    </p>

                    <p className="mb-[7px] mt-0 flex items-start gap-[5px]">
                        <span className="shrink-0 text-[1.25em] leading-none">⌖</span>
                        <span>{post.location}</span>
                    </p>
                </div>

                <div className={`relative z-[2] min-w-0 self-stretch mb-[-5%] box-border bg-[var(--color-secondary)] p-2 pb-[calc(8px+5%)] text-[var(--color-tertiary)] text-[clamp(7px,3.5cqw,10px)] leading-[1.35] [overflow-wrap:anywhere] ${styles.description}`}>
                    <p className="mb-2 mt-0">{post.description}</p>

                    <div className="flex flex-wrap gap-x-[6px] gap-y-[3px] text-[var(--color-tertiary)] text-[0.85em]">
                        {post.tags.map((tag) => (
                            <span key={tag}>#{tag} </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}