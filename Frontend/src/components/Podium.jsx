function Podium({ hotels }) {
    if (hotels.length === 0) return null;
    
    const first = hotels[0];
    const second = hotels[1] || null;
    const third = hotels[2] || null;

    return (
        <div style={{ marginBottom: "40px" }}>
            <h3> Top 3 recommandations </h3>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-end",
                    marginTop: "40px",
                }}
            >
                <div style={{ flex: 1 }}>
                    <div
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-10px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                        style={{
                            position: "relative",
                            height: "350px",
                            borderRadius: "24px",
                            overflow: "hidden",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.60)",
                            transition: "0.3s",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={`/images/${second.photo}`}
                            alt={second.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: "20px",
                                left: "20px",
                                background: "#BFC1C2",
                                color: "white",
                                padding: "10px 16px",
                                borderRadius: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            #2 — Argent
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                color: "white",
                            }}
                        >
                            <div style={{ fontSize: "56px", fontWeight: "bold" }}>
                                {second.score}
                                <span style={{ fontSize: "22px", opacity: 0.8 }}>%</span>
                            </div>

                            <h3>{second.name}</h3>

                            <p>{second.dynamic_price || second.price_per_night}€ / nuit</p>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1.2 }}>
                    <div
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-10px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                        style={{
                            position: "relative",
                            height: "420px",
                            borderRadius: "24px",
                            overflow: "hidden",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.60)",
                            transition: "0.3s",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={`/images/${first.photo}`}
                            alt={first.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: "20px",
                                left: "20px",
                                background: "#D4AF37",
                                color: "white",
                                padding: "10px 16px",
                                borderRadius: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            🏆 #1
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "25px",
                                left: "25px",
                                color: "white",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "56px",
                                    fontWeight: "bold",
                                    lineHeight: 1,
                                }}
                            >
                                {first.score.toFixed(1)}
                                <span style={{ fontSize: "22px", opacity: 0.8 }}>%</span>
                            </div>

                            <h2 style={{ marginTop: "10px", color: "white" }}>
                                {first.name}
                            </h2>

                            <p style={{ opacity: 0.85 }}>
                                {first.dynamic_price || first.price_per_night}€ / nuit
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <div
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-10px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                        style={{
                            position: "relative",
                            height: "320px",
                            borderRadius: "24px",
                            overflow: "hidden",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.60)",
                            transition: "0.3s",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src={`/images/${third.photo}`}
                            alt={third.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))",
                            }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: "20px",
                                left: "20px",
                                background: "#B87333",
                                color: "white",
                                padding: "10px 16px",
                                borderRadius: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            #3 — Bronze
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: "20px",
                                left: "20px",
                                color: "white",
                            }}
                        >
                            <div style={{ fontSize: "56px", fontWeight: "bold" }}>
                                {third.score}
                                <span style={{ fontSize: "22px", opacity: 0.8 }}>%</span>
                            </div>

                            <h3>{third.name}</h3>

                            <p>{third.dynamic_price || third.price_per_night}€ / nuit</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Podium;