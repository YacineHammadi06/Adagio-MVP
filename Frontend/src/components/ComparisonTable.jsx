import { useState } from "react";

function ComparisonTable({ hotels = [] }) {
    const [selectedHotels, setSelectedHotels] = useState([]);

    const activeHotels =
        selectedHotels.length > 0
            ? selectedHotels
            : hotels.slice(0, 4);

    const toggleHotel = (hotel) => {
        const exists = activeHotels.some((h) => h.id === hotel.id);

        if (exists) {
            setSelectedHotels(
                activeHotels.filter((h) => h.id !== hotel.id)
            );
        } else {
            if (activeHotels.length >= 4) return;

            setSelectedHotels([...activeHotels, hotel]);
        }
    };

    if (!hotels.length) return null;

    return (
        <div style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            marginTop: "40px",
            marginBottom: "40px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
        }}>

            <h2 style={{
                color: "#C8102E",
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "8px"
            }}>
                Comparer les hôtels
            </h2>

            <p style={{
                color: "#666",
                marginBottom: "25px"
            }}>
                Sélectionnez jusqu'à 4 hôtels du Top 10
            </p>

            {/* SELECTOR */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "30px"
            }}>
                {hotels.slice(0, 10).map((hotel) => {
                    const selected = activeHotels.some(
                        (h) => h.id === hotel.id
                    );

                    return (
                        <div
                            key={hotel.id}
                            onClick={() => toggleHotel(hotel)}
                            style={{
                                padding: "14px 20px",
                                borderRadius: "14px",
                                cursor: "pointer",
                                border: selected
                                    ? "2px solid #C8102E"
                                    : "1px solid #ddd",
                                background: selected
                                    ? "#C8102E"
                                    : "white",
                                color: selected
                                    ? "white"
                                    : "black",
                                fontWeight: selected ? "600" : "500",
                                boxShadow: selected
                                    ? "0 6px 18px rgba(200,16,46,0.25)"
                                    : "none",
                                transition: "all 0.25s ease"
                            }}
                        >
                            {selected ? "✓ " : ""}
                            #{hotels.findIndex(h => h.id === hotel.id) + 1} {hotel.name}
                        </div>
                    );
                })}
            </div>

            {/* TABLE */}
            <table style={{
                width: "100%",
                borderCollapse: "collapse"
            }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                        <th
                            style={{
                                padding: "18px",
                                textAlign: "left",
                                verticalAlign: "middle",
                                color: "#666",
                                fontWeight: "700",
                                fontSize: "24px",
                                minWidth: "180px"
                            }}
                        >
                            CRITÈRE
                        </th>

                        {activeHotels.map((hotel) => (
                            <th
                                key={hotel.id}
                                style={{
                                    padding: "24px 18px",
                                    textAlign: "center",
                                    borderBottom: "1px solid #eee"
                                }}
                            >
                                <img
                                    src={`/images/${hotel.photo}`}
                                    alt={hotel.name}
                                    style={{
                                        width: "64px",
                                        height: "48px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        marginBottom: "10px"
                                    }}
                                />

                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#C8102E",
                                        fontWeight: "700",
                                        marginBottom: "6px"
                                    }}
                                >
                                    #{hotels.findIndex(h => h.id === hotel.id) + 1}
                                </div>

                                <div
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "15px",
                                        color: "#111"
                                    }}
                                >
                                    {hotel.name}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    <tr style={{ background: "white" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            💶 Prix par nuit
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center", color: "#0a9d45", fontWeight: "600" }}>
                                {hotel.dynamic_price || hotel.price_per_night} €
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "#f8f8f8" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            📈 Coût total
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center", fontWeight: "600" }}>
                                {(hotel.total_price || (hotel.dynamic_price || hotel.price_per_night))} €
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "white" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            👥 Capacité
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                {hotel.capacity} pers.
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "#f8f8f8" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            🛏 Chambres
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                {hotel.bedrooms}
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "white" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            ⭐ Note clients
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                {hotel.rating}/5
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "#f8f8f8" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            🍽 Cuisine équipée
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                ✅
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "white" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            🚗 Parking
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                {hotel.parking ? "✅" : "❌"}
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "#f8f8f8" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            🏊 Piscine
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                {hotel.pool ? "✅" : "❌"}
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "white" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            📶 Wi-Fi inclus
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                {hotel.wifi ? "✅" : "❌"}
                            </td>
                        ))}
                    </tr>

                    <tr style={{ background: "#f8f8f8" }}>
                        <td style={{ padding: "20px", fontWeight: "500" }}>
                            🏋 Espace sport
                        </td>
                        {activeHotels.map((hotel) => (
                            <td key={hotel.id} style={{ textAlign: "center" }}>
                                {hotel.gym ? "✅" : "❌"}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ComparisonTable;