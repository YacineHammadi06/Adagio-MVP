export default function BookingSummary() {
    return (
        <div className="sticky top-6 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
                Résumé
            </h2>

            <div className="space-y-3">

                <div className="flex justify-between">
                    <span>3 nuits</span>
                    <span>420 €</span>
                </div>

                <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>25 €</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>445 €</span>
                </div>

            </div>

            <button className="mt-6 w-full rounded-xl bg-[#D97706] py-4 font-semibold text-white transition hover:opacity-90">
                Continuer vers le paiement
            </button>

        </div>
    );
}