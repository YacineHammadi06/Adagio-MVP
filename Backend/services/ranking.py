def normalize(value, min_value, max_value):
    if max_value == min_value:
        return 10

    return ((value - min_value) / (max_value - min_value)) * 10


def calculate_score(
    residence,
    residences,
    price_weight,
    comfort_weight
):
    prices = [r["price_per_night"] for r in residences]

    min_price = min(prices)
    max_price = max(prices)

    price_score = 10 - normalize(
        residence["price_per_night"],
        min_price,
        max_price
    )

    comfort_score = residence["comfort_score"]

    rating_score = residence["rating"] * 2
    bedroom_score = min(residence["bedrooms"] * 2, 10)

    weighted_sum = (
        price_score * price_weight +
        comfort_score * comfort_weight +
        rating_score * 2 +
        bedroom_score * 1
    )

    total_weight = (
        price_weight +
        comfort_weight +
        2 +
        1
    )

    final_score = (weighted_sum / total_weight) * 10

    return round(final_score, 1)