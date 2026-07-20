import { useState, useEffect } from "react";
import api from "../services/api";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Podium from "../components/Podium";
import HotelCard from "../components/HotelCard";
import MapView from "../components/MapView";
import ComparisonTable from "../components/ComparisonTable";
import { useNavigate } from "react-router-dom";
import "../App.css";
function App() {
    const [results, setResults] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [city, setCity] = useState("");
    const [budget, setBudget] = useState(180);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const nights =
        checkIn && checkOut
            ? Math.max(
                0,
                Math.ceil(
                    (checkOut - checkIn) / (1000 * 60 * 60 * 24)
                )
            )
            : 0;
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);
    const [showTravelers, setShowTravelers] = useState(false);
    const [priceWeight, setPriceWeight] = useState(5);
    const [comfortWeight, setComfortWeight] = useState(3);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [allHotels, setAllHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/all-hotels").then((res) => {
            setAllHotels(res.data);
        });
    }, []);



    const searchHotels = async () => {
        try {
            const response = await api.post("/search", {
                city,
                travelers: adults + children,
                adults,
                children,
                rooms,
                budget,
                check_in: checkIn
                    ? checkIn.toISOString().split("T")[0]
                    : null,
                check_out: checkOut
                    ? checkOut.toISOString().split("T")[0]
                    : null,
                nights,
                amenities: selectedAmenities,
                price_weight: priceWeight,
                comfort_weight: comfortWeight,
            });

            setResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            alert("Erreur pendant la recherche");
        }
    };


    const searchHotelsAI = async () => {
        setLoading(true);
        try {
            const response = await api.post("/smart-search", {
                prompt
            });

            setResults(response.data.results);
            console.log(response.data);
            console.log("RESULTS =", response.data.results);
            console.log("FIRST HOTEL =", response.data.results[0]);

            if (response.data.filters?.city) {
                setCity(response.data.filters.city);
            }

            if (response.data.filters?.adults !== null) {
                setAdults(response.data.filters.adults);
            }

            if (response.data.filters?.children !== null) {
                setChildren(response.data.filters.children);
            }

            if (response.data.filters?.rooms !== null) {
                setRooms(response.data.filters.rooms);
            }

            if (response.data.filters?.check_in) {
                setCheckIn(new Date(response.data.filters.check_in));
            }

            if (response.data.filters?.check_out) {
                setCheckOut(new Date(response.data.filters.check_out));
            }

            if (response.data.filters?.budget) {
                setBudget(response.data.filters.budget);
            }

            if (response.data.filters?.amenities) {
                setSelectedAmenities(response.data.filters.amenities);
            }

            if (response.data.filters?.price_weight) {
                setPriceWeight(response.data.filters.price_weight);
            }

            if (response.data.filters?.comfort_weight) {
                setComfortWeight(response.data.filters.comfort_weight);
            }

            navigate("/search", {
                state: {
                    results: response.data.results,
                    filters: response.data.filters,
                },
            });

        }

        catch (error) {
            console.error(error);
            alert("Erreur pendant la recherche IA");
        }

        finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
            <Header hasSidebar={false} />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minHeight: "calc(100vh - 80px)",
                        padding: "clamp(16px,3vw,40px)",
                    }}
            ><h2 className="home-main-title">
                    Découvrez nos aparthotels dans le monde
                </h2>


                <h1 className="home-ai-title">
                    Recherche intelligente Adagio Match
                </h1>

                    <p
                        style={{
                            color: "#666",
                            marginBottom: "40px",
                            fontSize: "clamp(15px,2vw,18px)",
                        }}
                    >
                        Trouvez la résidence idéale en quelques secondes
                    </p>

                    {/* MAP */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "2000px",
                            height: "clamp(280px,50vw,600px)",
                            borderRadius: "24px",
                            overflow: "hidden",
                            marginBottom: "40px",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                        }}
                    >
                    <MapView
                        hotels={allHotels}
                        showPrices={false}
                        setSelectedHotel={setSelectedHotel}
                    />
                    </div>

                    {/* SIDEPANEL */}
                    {selectedHotel && (
                        <div
                            style={{
                                position: "fixed",
                                top: "90px",
                                right: "0",
                                width: "420px",
                                height: "calc(100vh - 90px)",
                                background: "white",
                                color: "#111",
                                boxShadow: "-8px 0 30px rgba(0,0,0,0.15)",
                                zIndex: 9999,
                                padding: "24px",
                                overflowY: "auto",
                                animation: "slideIn 0.35s ease-out",
                            }}
                        >
                            <div
                                style={{
                                    background: "#C8102E",
                                    margin: "-24px -24px 24px -24px",
                                    padding: "18px",
                                    textAlign: "center",
                                    fontWeight: "700",
                                    fontSize: "22px",
                                    color: "white",
                                }}
                            >
                                ADAGIO
                            </div>

                            <button
                                onClick={() => setSelectedHotel(null)}
                                style={{
                                    position: "absolute",
                                    top: "20px",
                                    right: "20px",
                                    border: "none",
                                    background: "none",
                                    fontSize: "28px",
                                    cursor: "pointer",
                                }}
                            >
                                ×
                            </button>

                            <img
                                src={`/images/${selectedHotel.photo}`}
                                alt={selectedHotel.name}
                                style={{
                                    width: "100%",
                                    height: "240px",
                                    objectFit: "cover",
                                    borderRadius: "20px",
                                    marginBottom: "20px",
                                }}
                            />

                            <p
                                style={{
                                    color: "#111",
                                    marginBottom: "10px",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                    textAlign: "center",
                                }}
                            >
                                {selectedHotel.city} - {selectedHotel.country}
                            </p>
                            <h2
                                style={{
                                    marginBottom: "16px",
                                    color: "#111",
                                    fontSize: "24px",
                                    fontWeight: "700",
                                    lineHeight: "1.3",
                                    textAlign: "center",
                                }}
                            >
                                {selectedHotel.name}
                            </h2>
                            <p
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    color: "#111",
                                    textAlign: "center",
                                }}
                            >
                                {selectedHotel.dynamic_price || selectedHotel.price_per_night}€ / nuit
                            </p>

                            <div
                                style={{
                                    marginTop: "20px",
                                    textAlign: "left",
                                    lineHeight: "1.9",
                                    color: "#444",
                                    fontSize: "15px",
                                    padding: "0 10px",
                                }}
                            >
                                <p>👥 Capacité : {selectedHotel.capacity} voyageurs</p>
                                <p>🛏 Chambres : {selectedHotel.bedrooms}</p>
                                <p>⭐ Note : {selectedHotel.rating}</p>
                                <p>📶 Wifi : {selectedHotel.wifi ? "Oui" : "Non"}</p>
                                <p>🚗 Parking : {selectedHotel.parking ? "Oui" : "Non"}</p>
                                <p>🏊 Piscine : {selectedHotel.pool ? "Oui" : "Non"}</p>
                                <p>🏋 Salle sport : {selectedHotel.gym ? "Oui" : "Non"}</p>
                                <p>❄ Climatisation : {selectedHotel.air_conditioning ? "Oui" : "Non"}</p>
                                <p>🐶 Animaux : {selectedHotel.pets_allowed ? "Oui" : "Non"}</p>
                            </div>

                            <button
                                onClick={() => navigate(`/hotel/${selectedHotel.id}`)}
                                style={{
                                    marginTop: "50px",
                                    width: "100%",
                                    padding: "14px",
                                    background: "#111",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                Choisir un appartement
                            </button>
                        </div>


                    )}

                    {/* SEARCH BAR */}
                    <div
                        style={{
                            width: "95%",
                            maxWidth: "2000px",
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap",
                            alignItems: "stretch",
                            marginTop: "20px",
                        }}
                    >
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ex : Je pars à Paris avec ma famille, budget 180 EUR, piscine et parking si possible."
                            style={{
                                flex: "1 1 500px",
                                height: "95px",
                                background: "white",
                                color: "black",
                                padding: "20px 24px",
                                fontSize: "clamp(15px,2vw,20px)",
                                borderRadius: "18px",
                                border: "1px solid #ddd",
                                resize: "none",
                            }}
                        />

                        <button
                            onClick={searchHotelsAI}
                            style={{
                                flex: "1 1 250px",
                                height: "95px",
                                background: "#C8102E",
                                color: "white",
                                fontSize: "clamp(18px,2vw,24px)",
                                border: "none",
                                borderRadius: "18px",
                                cursor: "pointer",
                                fontWeight: "700",
                            }}
                        >
                            {loading ? "Recherche..." : "Voir mes options"}
                        </button>
                    </div>

                    {/* DESTINATIONS */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "2000px",
                            marginTop: "80px",
                        }}
                    >
                        <h2
                            style={{
                            fontSize: "clamp(28px,4vw,48px)",
                                fontWeight: "700",
                                marginBottom: "10px",
                                color: "#111",
                                textAlign: "left",
                            }}
                        >
                            Toutes nos destinations
                        </h2>

                        <p
                            style={{
                                color: "black",
                                fontSize: "22px",
                                marginBottom: "40px",
                                textAlign: "left",
                            }}
                        >
                            {allHotels.length} Aparthotels
                        </p>

                        <div
                            style={{
                                display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                                gap: "30px",
                            }}
                        >
                            {allHotels.map((hotel) => (
                                <div
                                    key={hotel.id}
                                    style={{
                                        background: "white",
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    <img
                                        src={`/images/${hotel.photo}`}
                                        alt={hotel.name}
                                        style={{
                                            width: "100%",
                                            height: "230px",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div style={{ padding: "24px" }}>
                                        <p
                                            style={{
                                                color: "#666",
                                                fontSize: "18px",
                                                marginBottom: "14px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {hotel.city} - {hotel.country}
                                        </p>

                                        <h3
                                            style={{
                                                color: "#111",
                                                fontSize: "24px",
                                                fontWeight: "700",
                                                margin: 0,
                                                marginBottom: "24px",
                                                textAlign: "center",
                                                minHeight: "72px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {hotel.name}
                                        </h3>

                                        <button

                                            onClick={() => navigate(`/hotel/${hotel.id}`)}
                                            style={{
                                                width: "100%",
                                                height: "56px",
                                                marginTop: "24px",
                                                background: "#111",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "14px",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Choisir un appartement
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>    
        </div>
    );
}

export default App;