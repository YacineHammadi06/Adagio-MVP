export default function HotelMiniCard() {
    return (
        <div className="rounded-2xl bg-white p-5 shadow">

            <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                alt=""
                className="mb-4 h-52 w-full rounded-xl object-cover"
            />

            <h2 className="text-xl font-bold">
                Aparthotel Adagio Paris Centre
            </h2>

            <p className="mt-2 text-gray-500">
                Paris • France
            </p>

            <div className="mt-4 flex gap-2">

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    Wi-Fi
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    Cuisine
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    Parking
                </span>

            </div>

        </div>
    );
}