import type { Post } from "../testdata/EventPostData";

export function formatDate(date: Post["date"]) {
    if (date.type === "single") return date.value;

    const parseDate = (value: string) => {
        const [day, month, year] = value.split(".").map(Number);
        return { day, month, year };
    };

    const from = parseDate(date.from);
    const to = parseDate(date.to);

    if (from.month == to.month && from.year == to.year) {
        return `${from.day}. - ${to.day}.${String(to.month).padStart(2, "0")}.${to.year}`;
    }

    if (from.year == to.year) {
        return `${String(from.day).padStart(2, "0")}.${String(from.month).padStart(2, "0")}. - ${String(to.day).padStart(2, "0")}.${String(to.month).padStart(2, "0")}.${to.year}`;
    }

    return `${date.from} - ${date.to}`;
}

export function formatTime(time: Post["time"]) {
    if (time.type === "single") return time.value;

    return `${time.from} – ${time.to}`;
}