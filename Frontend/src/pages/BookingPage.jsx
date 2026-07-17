import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import HotelMiniCard from "../components/Booking/HotelMiniCard";
import RoomCard from "../components/Booking/RoomCard";
import TariffCard from "../components/Booking/TariffCard";
import BookingSummary from "../components/Booking/BookingSummary";

export default function BookingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">

            <Header />

            <div className="mx-auto max-w-7xl px-8 pt-6">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-[#C8102E] font-semibold hover:underline"
                >
                    ← Retour
                </button>

                <div className="grid grid-cols-3 gap-8">

                    <div className="col-span-2 space-y-6">
                        <HotelMiniCard />
                        <RoomCard />
                        <TariffCard />
                    </div>

                    <BookingSummary />

                </div>

            </div>

        </div>
    );
}