function Header({ hasSidebar = false }) {
    return (
        <div
            style={{
                position: "relative",
                height: "90px",
                background: "white",
                display: "flex",
                alignItems: "center",
                padding: "0 32px",
                borderBottom: "1px solid #eee",
            }}
        >
            <div style={{ display: "flex", gap: "30px", color: "black" }}>
                <span>Destinations</span>
                <span>Familles</span>
                <span>Professionnels</span>
            </div>

            <h1
                style={{
                    position: "absolute",
                    left: hasSidebar ? "calc(50% + 140px)" : "50%",
                    transform: "translateX(-50%)",
                    color: "#C8102E",
                    fontSize: "46px",
                    fontWeight: "700",
                    margin: 0,
                }}
            >
                ADAGIO
            </h1>

            <button
                style={{
                    position: "absolute",
                    right: "32px",
                    background: "#111",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "600",
                }}
            >
                Mon compte
            </button>
        </div>
    );
}

export default Header;