import { useState, useEffect } from "react";
import api from "../services/api";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Podium from "../components/Podium";
import HotelCard from "../components/HotelCard";
import MapView from "../components/Mapview";
import ComparisonTable from "../components/ComparisonTable";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const initialResults = location.state?.results || [];
    const initialFilters = location.state?.filters || {};
    const [results, setResults] = useState(initialResults);
    const [prompt, setPrompt] = useState("");
    const [city, setCity] = useState(initialFilters.city || "");
    const [budget, setBudget] = useState(initialFilters.budget || 180);
    const [checkIn, setCheckIn] = useState(
        initialFilters.check_in
            ? new Date(initialFilters.check_in)
            : null
    );
    const [checkOut, setCheckOut] = useState(
        initialFilters.check_out
            ? new Date(initialFilters.check_out)
            : null
    );
    const nights =
        checkIn && checkOut
            ? Math.max(
                0,
                Math.ceil(
                    (checkOut - checkIn) / (1000 * 60 * 60 * 24)
                )
            )
            : 0;
    const [adults, setAdults] = useState(initialFilters.adults || 2);
    const [children, setChildren] = useState(initialFilters.children || 0);
    const [rooms, setRooms] = useState(initialFilters.rooms || 1);
    const [showTravelers, setShowTravelers] = useState(false);
    const [priceWeight, setPriceWeight] = useState(
        initialFilters.price_weight ?? 3
    );

    const [comfortWeight, setComfortWeight] = useState(
        initialFilters.comfort_weight ?? 3
    );

    const [selectedAmenities, setSelectedAmenities] = useState(
        initialFilters.amenities || []
    );
    const [allHotels, setAllHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [loading, setLoading] = useState(false);
    

    

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
            console.log("FILTERS =", response.data.filters);
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
            <Header hasSidebar={true} />

            
                <div style={{ display: "flex" }}>
                    <Sidebar
                        city={city}
                        setCity={setCity}
                        adults={adults}
                        setAdults={setAdults}
                        children={children}
                        setChildren={setChildren}
                        rooms={rooms}
                        setRooms={setRooms}
                        showTravelers={showTravelers}
                        setShowTravelers={setShowTravelers}
                        budget={budget}
                        setBudget={setBudget}
                        checkIn={checkIn}
                        setCheckIn={setCheckIn}
                        checkOut={checkOut}
                        setCheckOut={setCheckOut}
                        nights={nights}
                        selectedAmenities={selectedAmenities}
                        setSelectedAmenities={setSelectedAmenities}
                        priceWeight={priceWeight}
                        setPriceWeight={setPriceWeight}
                        comfortWeight={comfortWeight}
                        setComfortWeight={setComfortWeight}
                        searchHotels={searchHotels}
                    />

                    <div
                        style={{
                            flex: 1,
                            padding: "40px",
                            color: "black",
                            background: "#f7f8fa",
                        }}
                    >
                        <div style={{ marginBottom: "30px" }}>
                            <h3
                                style={{
                                    fontSize: "36px",
                                    fontWeight: "700",
                                    marginBottom: "10px",
                                }}
                            >
                                Vos meilleures options{" "}
                                <span style={{ color: "#C8102E" }}>
                                    {city ? `à ${city}` : "dans toutes les destinations"}
                                </span>
                            </h3>

                            <p style={{ color: "#000", fontSize: "18px" }}>
                                {results.length} résultats trouvés
                            </p>
                        </div>

                        <div
                            style={{
                                height: "500px",
                                marginBottom: "40px",
                                borderRadius: "24px",
                                overflow: "hidden",
                                boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
                            }}
                        >
                            <MapView
                                hotels={results}
                                showPrices={true}
                                setSelectedHotel={setSelectedHotel}
                            />

                        </div>

                        {results.length === 0 ? (
                            <div
                                style={{
                                    background: "white",
                                    padding: "40px",
                                    borderRadius: "20px",
                                    marginTop: "30px",
                                    textAlign: "center",
                                    boxShadow: "0 8px 24px rgba(0,0,0,0.06)"
                                }}
                            >
                                <h3 style={{ color: "#C8102E", marginBottom: "16px" }}>
                                    Aucun résultat trouvé
                                </h3>

                                <p style={{ color: "#555", fontSize: "18px" }}>
                                    Aucune résidence ne correspond exactement à vos critères.
                                </p>

                                <p style={{ color: "#777", marginTop: "12px" }}>
                                    Essayez d'élargir votre budget ou de retirer un équipement.
                                </p>
                            </div>
                        ) : (
                            <>
                                {results.length >= 3 && <Podium hotels={results} />}

                                <h3 style={{ marginTop: "40px" }}>
                                    Top 10 des correspondances
                                </h3>

                                {(results.length >= 3
                                    ? results.slice(3, 10)
                                    : results.slice(0, 10)
                                ).map((hotel, index) => (
                                    <HotelCard
                                        key={hotel.id}
                                        hotel={hotel}
                                        index={index + 4}
                                    />
                                ))}

                                <ComparisonTable hotels={results} />
                            </>
                        )}
                    </div>
                </div>
        </div>
    );
}

export default App;