// comman/GlobalSearch.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalSearchAction } from "../config/redux/action/globalSearchAction";

const GlobalSearch = ({ searchQuery }) => {
    const dispatch = useDispatch();

    // ⬇️ yahan correct slice padho
    const {
        users,
        properties,
        experiences,
        bookings,
        isLoading,
        isError,
        message,
    } = useSelector((state) => state.search);


    // query change par API hit
    useEffect(() => {
        if (searchQuery?.trim()) {
            dispatch(globalSearchAction({ query: searchQuery.trim() }));
        }
    }, [searchQuery, dispatch]);

    if (!searchQuery) {
        return <p style={{ textAlign: "center", marginTop: 20 }}>Start typing to search...</p>;
    }

    if (isLoading) return <p style={{ textAlign: "center" }}>Loading search results...</p>;
    if (isError) return <p style={{ color: "red", textAlign: "center" }}>{message || "Search failed"}</p>;

    const noResults =
        (users?.length || 0) === 0 &&
        (properties?.length || 0) === 0 &&
        (experiences?.length || 0) === 0 &&
        (bookings?.length || 0) === 0;

    return (
        <div style={{ padding: 20 }}>
            <h3>Search Results for: "{searchQuery}"</h3>

            {users?.length > 0 && (
                <section>
                    <h4>👤 Users</h4>
                    <ul>
                        {users.map((u) => (
                            <li key={u._id}>{u.name} ({u.email})</li>
                        ))}
                    </ul>
                </section>
            )}

            {properties?.length > 0 && (
                <section>
                    <h4>🏠 Properties</h4>
                    <ul>
                        {properties.map((p) => (
                            <li key={p._id}>{p.title} — {p.city}, {p.country}</li>
                        ))}
                    </ul>
                </section>
            )}

            {experiences?.length > 0 && (
                <section>
                    <h4>🎉 Experiences</h4>
                    <ul>
                        {experiences.map((e) => (
                            <li key={e._id}>{e.title} — {e.city}, {e.country}</li>
                        ))}
                    </ul>
                </section>
            )}

            {bookings?.length > 0 && (
                <section>
                    <h4>📅 Bookings</h4>
                    <ul>
                        {bookings.map((b) => (
                            <li key={b._id}>Booking by {b.user?.name} for {b.property?.title}</li>
                        ))}
                    </ul>
                </section>
            )}

            {noResults && <p>No results found for "{searchQuery}".</p>}
        </div>
    );
};

export default GlobalSearch;
