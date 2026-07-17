from pydantic import BaseModel
from typing import Optional


class SearchRequest(BaseModel):
    city: Optional[str] = None
    travelers: int
    adults: int
    children: int
    budget: int | None = None
    check_in: str | None = None
    check_out: str | None = None
    nights: int | None = None
    amenities: list[str] = []

    price_weight: int = 1
    comfort_weight: int = 5