import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, index }) {
    const navigate = useNavigate();

    return (
        <div
            style={{
                background: "white",
                borderBottom: "1px solid #ddd",
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "20px",
            }}
        >
            {/* LEFT */}
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <div style={{ position: "relative" }}>
                    <div
                        style={{
                            position: "absolute",
                            top: "8px",
                            left: "8px",
                            background: "#C8102E",
                            color: "white",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                        }}
                    >
                        #{index}
                    </div>

                    <img
                        src={`/images/${hotel.photo}`}
                        alt={hotel.name}
                        style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "14px",
                        }}
                    />
                </div>

                <div style={{ textAlign: "left" }}>
                    <h3 style={{ margin: "0 0 10px 0" }}>
                        {hotel.name}
                    </h3>

                    <p style={{ marginBottom: "8px", color: "#666" }}>
                        ⭐ {hotel.rating}/5
                    </p>

                    <p style={{ marginBottom: "8px", color: "#666" }}>
                        {hotel.bedrooms} chambres
                    </p>

                    <p style={{ color: "#C8102E", fontWeight: "bold" }}>
                        Score : {hotel.score}
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div style={{ textAlign: "right", minWidth: "160px" }}>
                <h3 style={{ margin: 0 }}>
                    {hotel.dynamic_price || hotel.price_per_night} €
                </h3>

                <p style={{ color: "#666", marginBottom: "15px" }}>
                    par nuit
                </p>

                <button
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    style={{
                        background: "#111",
                        color: "white",
                        border: "none",
                        padding: "12px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    Voir détail
                </button>
            </div>
        </div>
    );
}

export default HotelCard;