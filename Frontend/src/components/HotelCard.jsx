import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, index }) {
    const navigate = useNavigate();

    return (
        <div className="hotel-card-ranking">

            {/* LEFT */}
            <div className="hotel-card-ranking-left">

                <div className="hotel-card-ranking-image-wrapper">
                    <div className="hotel-card-ranking-badge">
                        #{index}
                    </div>

                    <img
                        src={`/images/${hotel.photo}`}
                        alt={hotel.name}
                        className="hotel-card-ranking-image"
                    />
                </div>

                <div className="hotel-card-ranking-info">
                    <h3>
                        {hotel.name}
                    </h3>

                    <p>
                        ⭐ {hotel.rating}/5
                    </p>

                    <p>
                        {hotel.bedrooms} chambres
                    </p>

                    <p className="hotel-card-ranking-score">
                        Score : {hotel.score}
                    </p>
                </div>
            </div>

            {/* RIGHT */}
            <div className="hotel-card-ranking-right">
                <h3>
                    {hotel.dynamic_price || hotel.price_per_night} €
                </h3>

                <p>
                    par nuit
                </p>

                <button
                    onClick={() =>
                        navigate(`/hotel/${hotel.id}`, {
                            state: { hotel }
                        })
                    }
                >
                    Voir détail
                </button>
            </div>

        </div>
    );
}

export default HotelCard;