import {
    useParams,
    useNavigate,
    useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../services/api";
import "./HotelDetailPage.css";
import Header from "../components/Header";
function HotelDetailPage() {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [hotel, setHotel] = useState(location.state?.hotel || null);

    useEffect(() => {

        if (!hotel) {

            api.get(`/hotel/${id}`)
                .then((res) => setHotel(res.data))
                .catch((err) => console.error(err));

        }

    }, [id]);

    if (!hotel) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
        <Header />

        <div className="hotel-page">

            <div className="hotel-container">

                <div className="hotel-top">

                    <button
                        className="back-button"
                        onClick={() => navigate(-1)}
                    >
                        ← Retour
                    </button>

                </div>

                <div className="hotel-gallery">

                    <div className="gallery-main">
                        <img
                            src={`/images/${hotel.photo}`}
                            alt={hotel.name}
                        />
                    </div>

                    <div className="gallery-side">

                        <img src={`/images/${hotel.photo}`} alt="" />
                        <img src={`/images/${hotel.photo}`} alt="" />
                        <img src={`/images/${hotel.photo}`} alt="" />
                        <img src={`/images/${hotel.photo}`} alt="" />

                    </div>

                </div>

                <div className="hotel-header">

                    <h1>{hotel.name}</h1>

                    <p className="hotel-location">
                        📍 {hotel.city}, {hotel.country}
                    </p>

                    <p className="hotel-rating">
                        ⭐ {hotel.rating}
                    </p>

                </div>

                <div className="hotel-content">

                    <div className="hotel-left">

                        <h2>Appartement proposé</h2>

                        <div className="room-card">

                            <h3>
                                Studio pour {hotel.capacity} personnes
                            </h3>

                            <p>{hotel.bedrooms} chambre</p>

                            <p>{hotel.hotel_type}</p>

                        </div>

                    </div>

                    <div className="booking-card">

                        <h2>Votre séjour</h2>

                        <h1>
                            {hotel.dynamic_price || hotel.price_per_night} €
                        </h1>

                        <p>par nuit</p>

                        <button>
                            Réserver
                        </button>

                    </div>

                </div>

            </div>

        </div>
    </>

    );
}

export default HotelDetailPage;