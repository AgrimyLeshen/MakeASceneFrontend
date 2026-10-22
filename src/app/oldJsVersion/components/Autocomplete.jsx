import React, { useState, useEffect } from "react";
import "../css/Autocomplete.css";

function Autocomplete({ placeholder = "Search...", onSelect }) {
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setOptions([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const timeoutId = setTimeout(async () => {
            try {
                setLoading(true);

                const params = new URLSearchParams({
                    query: query,
                    autocomplete: true,
                    page: 1,
                });

                const res = await fetch(
                    `http://127.0.0.1:5000/v1/tags?${params}`,
                    {
                        signal: controller.signal,
                    }
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();

                console.log("API response:", data);

                const tags = data?.tags ?? [];

                setOptions(Array.isArray(tags) ? tags : []);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err);
                    setOptions([]);
                }
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query]);

    return (
        <div className="autocomplete">
            <input
                className="text-input"
                type="text"
                value={query}
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
            />

            {(loading || options.length > 0) && (
                <div className="autocomplete-dropdown">
                    {loading && <div className="autocomplete-option">Loading...</div>}

                    {!loading &&
                        options.map((option) => (
                            <div
                                key={option.id}
                                className="autocomplete-option"
                                onClick={() => {
                                    onSelect?.(option);
                                    setQuery(option.name);
                                    setOptions([]);
                                }}
                            >
                                {option.name}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default Autocomplete;