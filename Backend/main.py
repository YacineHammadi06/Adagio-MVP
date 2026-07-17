from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.data_loader import load_residences
from services.ranking import calculate_score
from models.search_request import SearchRequest
from ai_parser import parse_prompt
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
CITY_ALIASES = {
    "paris": "Paris",
    "parís": "Paris",

    "barcelona": "Barcelona",
    "barcelone": "Barcelona",
    "barcelon": "Barcelona",

    "london": "London",
    "londres": "London",

    "rome": "Rome",
    "roma": "Rome",

    "madrid": "Madrid",

    "amsterdam": "Amsterdam",

    "lyon": "Lyon",

    "marseille": "Marseille"
}
def normalize_city(city):
    if not city:
        return city

    return CITY_ALIASES.get(city.lower().strip(), city)

@app.get("/")
def root():
    return {"status": "ok"}


@app.get("/residences")
def get_residences():
    return load_residences()


@app.get("/ranking")
def ranking(
    city: str,
    travelers: int,
    price_weight: int = 3,
    comfort_weight: int = 3
    
):
    residences = load_residences()

    filtered = [
        r for r in residences
        if r["city"].lower() == city.lower()
        and r["capacity"] >= travelers
    ]

    for residence in filtered:
        residence["score"] = calculate_score(
            residence,
            filtered,
            price_weight,
            comfort_weight
            
        )

    filtered.sort(key=lambda x: x["score"], reverse=True)

    return filtered


@app.get("/all-hotels")
def get_all_hotels():
    return load_residences()

@app.post("/search")
def search(request: SearchRequest):
    residences = load_residences()

    season_multiplier = 1

    if request.check_in:
        try:
            month = datetime.strptime(request.check_in, "%Y-%m-%d").month

            if month in [6, 7, 8, 12]:
                season_multiplier = 1.25
            elif month in [4, 5, 9, 10]:
                season_multiplier = 1.10

        except:
            season_multiplier = 1

    # Si une ville est renseignée → filtrer par ville
    normalized_city = normalize_city(request.city)
    if request.city and request.city.strip():
        filtered = [
            r for r in residences
            if r["city"].lower() == normalized_city.lower()
            and r["capacity"] >= request.travelers
        ]
    else:
        # Sinon → chercher dans toutes les résidences
        filtered = [
            r for r in residences
            if r["capacity"] >= request.travelers
        ]

    # Filtre budget avec prix dynamique
    if request.budget:
        filtered = [
                r for r in filtered
            if (r["price_per_night"] * season_multiplier) <= request.budget
        ]

    # Filtre équipements
    if request.amenities:
        for amenity in request.amenities:
            filtered = [
                r for r in filtered
                if amenity in r and r[amenity] == 1
            ]

    if len(filtered) == 0:
        return []

    # Calcul score + prix dynamique
    for residence in filtered:
        base_price = residence["price_per_night"]
        
        adult_multiplier = 1 + max(0, request.adults - 1) * 0.35
        children_cost = request.children * (base_price * 0.20)

        dynamic_price = (base_price * adult_multiplier) + children_cost
        dynamic_price *= season_multiplier

        residence["dynamic_price"] = round(dynamic_price)

        residence["score"] = calculate_score(
            residence,
            filtered,
            request.price_weight,
            request.comfort_weight
        )

        if request.nights:
            residence["total_price"] = (
                residence["dynamic_price"] * request.nights
            )

    # Trier par score décroissant
    filtered.sort(key=lambda x: x["score"], reverse=True)

    return filtered

@app.get("/hotel/{hotel_id}")
def get_hotel(hotel_id: int):
    residences = load_residences()

    hotel = next(
        (r for r in residences if int(r["id"]) == hotel_id),
        None
    )

    if hotel is None:
        return {"error": "Hotel not found"}

    return hotel

@app.post("/ai-search")
def ai_search(data: dict):
    result = parse_prompt(data["prompt"])
    return result


@app.post("/smart-search")
def smart_search(data: dict):
    ai_result = parse_prompt(data["prompt"])

    residences = load_residences()

    city = normalize_city(ai_result.get("city"))
    travelers = ai_result.get("travelers")
    adults = ai_result.get("adults") or travelers or 1
    children = ai_result.get("children") or 0
    budget = ai_result.get("budget")
    nights = ai_result.get("nights")
    check_in = ai_result.get("check_in")
    check_out = ai_result.get("check_out")
    amenities = ai_result.get("amenities", [])
    price_weight = ai_result.get("price_weight", 3)
    comfort_weight = ai_result.get("comfort_weight", 3)

    filtered = residences

    if city:
        filtered = [
            r for r in filtered
            if r["city"].lower() == city.lower()
        ]

    if travelers:
        filtered = [
            r for r in filtered
            if r["capacity"] >= travelers
        ]
    season_multiplier = 1

    if check_in:
        try:
            month = datetime.strptime(check_in, "%Y-%m-%d").month

            if month in [6, 7, 8, 12]:
                season_multiplier = 1.25
            elif month in [4, 5, 9, 10]:
                season_multiplier = 1.10

        except:
            season_multiplier = 1

    print("CHECK IN:", check_in)
    print("SEASON MULTIPLIER:", season_multiplier)

    if budget:
        filtered = [
            r for r in filtered
            if (r["price_per_night"] * season_multiplier) <= budget
        ]

    if amenities:
        for amenity in amenities:
            filtered = [
                r for r in filtered
                if amenity in r and r[amenity] == 1
            ]

    if len(filtered) == 0:
        return {
            "filters": ai_result,
            "results": []
        }

    for residence in filtered:
        base_price = residence["price_per_night"]

        adult_multiplier = 1 + max(0, adults - 1) * 0.35
        children_cost = children * (base_price * 0.20)

        dynamic_price = (base_price * adult_multiplier) + children_cost
        dynamic_price *= season_multiplier

        residence["dynamic_price"] = round(dynamic_price)

        residence["score"] = calculate_score(
            residence,
            filtered,
            price_weight,
            comfort_weight
    )

        if nights:
            residence["total_price"] = (
                residence["dynamic_price"] * nights
            )

    filtered.sort(key=lambda x: x["score"], reverse=True)

    print("FIRST RESULT:")
    print(filtered[0])

    return {
        "filters": ai_result,
        "results": filtered,
        "debug": filtered[0]
}