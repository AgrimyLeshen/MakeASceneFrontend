import type { Post } from "../../../../testdata/EventPostData";
import "./BasicLayout.css";

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
        <div className="basic-layout">
            <img
                className="basic-layout-image"
                src={post.image}
                alt={post.name}
            />

            <div className="basic-layout-top-shape" />

            <div className="basic-layout-transition-shape" />

            <div className="basic-layout-heading">
                <h2>{post.name}</h2>
                <p>{post.slogan}</p>
            </div>

            <div className="basic-layout-bottom-triangle" />

            <div className="basic-layout-details">
                <div className="basic-layout-info">
                    <p>
                        <span className="basic-layout-symbol">◷</span>
                        <span>
                            {formatTime(post.time)}
                            <br />
                            {formatDate(post.date)}
                        </span>
                    </p>

                    <p>
                        <span className="basic-layout-symbol">⌖</span>
                        <span>{post.location}</span>
                    </p>
                </div>

                <div className="basic-layout-description">
                    <p>{post.description}</p>

                    <div className="basic-layout-tags">
                        {post.tags.map((tag) => (
                            <span key={tag}>#{tag} </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}