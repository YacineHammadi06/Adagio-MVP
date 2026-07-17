import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Sidebar({
    city,
    setCity,
    adults,
    setAdults,
    children,
    setChildren,
    rooms,
    setRooms,
    showTravelers,
    setShowTravelers,
    budget,
    setBudget,
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    nights,
    selectedAmenities,
    setSelectedAmenities,
    priceWeight,
    setPriceWeight,
    comfortWeight,
    setComfortWeight,
    searchHotels
}) {


    const amenities = [
        ["wifi", "Wi-Fi"],
        ["parking", "Parking"],
        ["pool", "Piscine"],
        ["gym", "Espace sport"],
        ["breakfast", "Petit déjeuner"],
        ["air_conditioning", "Climatisation"],
        ["pets_allowed", "Animaux"],
        ["accessible", "Accès handicapés"],
        ["meeting_room", "Salle réunion"]
    ];

    const toggleAmenity = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(
                selectedAmenities.filter((a) => a !== amenity)
            );
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const buttonStyle = {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        border: "1px solid #C8102E",
        background: "white",
        color: "#C8102E",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };
    return (
        <div
            style={{
                width: "340px",
                background: "white",
                borderRight: "1px solid #ddd",
                minHeight: "100vh",
                color: "black",
                boxSizing: "border-box",
                padding: "25px"
            }}
        >
            <h3 style={{ marginBottom: "25px" }}>Construisez votre séjour</h3>

            <p>Destination</p>
            <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                    width: "100%",
                    height: "64px",
                    padding: "0 24px",
                    fontSize: "18px",
                    borderRadius: "18px",
                    border: "1px solid #ddd",
                    marginBottom: "20px",
                    boxSizing: "border-box",
                    background: "white",
                    color: "black",
                }}
            >
                <option value="">Toutes destinations</option>
                <option value="Paris">Paris</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Madrid">Madrid</option>
                <option value="Rome">Rome</option>
                <option value="London">London</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Lyon">Lyon</option>
                <option value="Marseille">Marseille</option>
            </select>

            <p>Budget max / nuit : {budget}€</p>
            <input
                type="range"
                min="60"
                max="400"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                style={{
                    width: "100%",
                    marginBottom: "25px",
                    background: `linear-gradient(to right,
            #C8102E 0%,
            #C8102E ${((budget - 60) / (400 - 60)) * 100}%,
            #ddd ${((budget - 60) / (400 - 60)) * 100}%,
            #ddd 100%)`
                }}
            />

            <p>Voyageurs</p>

            <div
                onClick={() => setShowTravelers(!showTravelers)}
                style={{
                    width: "90%",
                    padding: "16px 18px",
                    borderRadius: "14px",
                    background: "#C8102E",
                    color: "white",
                    cursor: "pointer",
                    marginBottom: "15px",
                    fontWeight: "500"
                }}
            >
                {rooms} appartement{rooms > 1 ? "s" : ""}, {adults} adulte{adults > 1 ? "s" : ""}
                {children > 0 ? `, ${children} enfant${children > 1 ? "s" : ""}` : ""}
            </div>

            <div
                style={{
                    background: "white",
                    border: showTravelers ? "1px solid #ddd" : "none",
                    borderRadius: "14px",
                    padding: showTravelers ? "14px" : "0px 14px",
                    marginBottom: "20px",
                    boxShadow: showTravelers
                        ? "0 8px 24px rgba(0,0,0,0.08)"
                        : "none",
                    maxHeight: showTravelers ? "260px" : "0px",
                    opacity: showTravelers ? 1 : 0,
                    overflow: "hidden",
                    transition: "all 0.35s ease"
                }}
            >
                {/* Appartements */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}>
                    <span>Appartements</span>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <button
                            style={buttonStyle}
                            onClick={() => setRooms(Math.max(1, rooms - 1))}
                        >
                            -
                        </button>
                        <span>{rooms}</span>
                        <button
                            style={buttonStyle}
                            onClick={() => setRooms(rooms + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Adultes */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}>
                    <span>Adultes</span>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <button
                            style={buttonStyle}
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                        >
                            -
                        </button>
                        <span>{adults}</span>
                        <button
                            style={buttonStyle}
                            onClick={() => setAdults(adults + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Enfants */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <span>Enfants</span>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <button
                            style={buttonStyle}
                            onClick={() => setChildren(Math.max(0, children - 1))}
                        >
                            -
                        </button>
                        <span>{children}</span>
                        <button
                            style={buttonStyle}
                            onClick={() => setChildren(children + 1)}
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <p>Date d'arrivée</p>
            <DatePicker
                selected={checkIn}
                onChange={(date) => setCheckIn(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Choisir une date"
                className="custom-datepicker"
            />

            <p style={{ marginTop: "20px" }}>Date de départ</p>
            <DatePicker
                selected={checkOut}
                onChange={(date) => setCheckOut(date)}
                minDate={checkIn}
                dateFormat="dd/MM/yyyy"
                placeholderText="Choisir une date"
                className="custom-datepicker"
            />

            <p style={{ marginTop: "20px", fontWeight: "bold" }}>
                {nights} nuit{nights > 1 ? "s" : ""}
            </p>

            <p>Équipements souhaités</p>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "15px",
                marginBottom: "30px"
            }}>
                {amenities.map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => toggleAmenity(key)}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "20px",
                            border: "1px solid #ddd",
                            cursor: "pointer",
                            background: selectedAmenities.includes(key)
                                ? "#C8102E"
                                : "white",
                            color: selectedAmenities.includes(key)
                                ? "white"
                                : "black",
                        }}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <hr />

            <h3>Pondérations</h3>

            <p>Prix : {priceWeight}</p>
            <input
                type="range"
                min="1"
                max="5"
                value={priceWeight}
                onChange={(e) => setPriceWeight(Number(e.target.value))}
                style={{
                    width: "100%",
                    marginBottom: "20px",
                    background: `linear-gradient(to right,
        #C8102E 0%,
        #C8102E ${((priceWeight - 1) / 4) * 100}%,
        #ddd ${((priceWeight - 1) / 4) * 100}%,
        #ddd 100%)`
                }}
            />

            <p>Confort : {comfortWeight}</p>
            <input
                type="range"
                min="1"
                max="5"
                value={comfortWeight}
                onChange={(e) => setComfortWeight(Number(e.target.value))}
                style={{
                    width: "100%",
                    marginBottom: "20px",
                    background: `linear-gradient(to right,
        #C8102E 0%,
        #C8102E ${((comfortWeight - 1) / 4) * 100}%,
        #ddd ${((comfortWeight - 1) / 4) * 100}%,
        #ddd 100%)`
                }}
            />



            <button
                onClick={searchHotels}
                style={{
                    width: "100%",
                    padding: "14px",
                    background: "#C8102E",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Afficher mes meilleures options
            </button>
        </div>
    );
}

export default Sidebar;