import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

print("OPENROUTER_API_KEY =", os.getenv("OPENROUTER_API_KEY"))

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


def parse_prompt(prompt):
    if not prompt or not prompt.strip():
        return {
            "city": None,
            "travelers": None,
            "adults": 1,
            "children": 0,
            "rooms": None,
            "budget": None,
            "check_in": None,
            "check_out": None,
            "nights": 1,
            "amenities": [],
            "price_weight": 3,
            "comfort_weight": 3
        }
        
    full_prompt = """
Extract hotel search filters from user request.

Return ONLY valid JSON.

Format:
{
    "city": "string or null",
    "travelers": number or null,
    "adults": number or null,
    "children": number or null,
    "rooms": number or null,
    "budget": number or null,
    "check_in": "YYYY-MM-DD or null",
    "check_out": "YYYY-MM-DD or null",
    "nights": number or null,
    "amenities": [],
    "price_weight": number,
    "comfort_weight": number
}

Available amenities:
- wifi
- parking
- pool
- gym
- pets_allowed
- air_conditioning

Rules:
- Extract check-in and check-out dates whenever possible
- Convert dates to YYYY-MM-DD format
- Example: "du 10 août au 15 août 2026" => check_in 2026-08-10, check_out 2026-08-15
- Distinguish adults and children whenever possible
- Example: "2 adultes et 2 enfants" = adults 2, children 2, travelers 4
- Example: "couple avec 1 enfant" = adults 2, children 1, travelers 3
- If only total travelers known, adults = travelers and children = 0
- rooms = estimated number of rooms/apartments needed
- Example: 4 travelers = rooms 2
- Example: 2 travelers = rooms 1
- If user explicitly gives number of travelers, use that number
- Example: "famille de 3 personnes" = travelers 3
- If couple and no number = 2
- If solo and no number = 1
- If family and no number = 4
- If not specified = null
- If user mentions "3 nuits" => nights = 3
- If user mentions "4 days" => nights = 4
- If not specified => null

Weight rules:
- price_weight and comfort_weight must be between 1 and 5
- 1 = negligible
- 2 = low importance
- 3 = normal
- 4 = important
- 5 = very important

Examples:
- "price is very important" = price_weight 5
- "comfort is negligible" = comfort_weight 1
- If not specified = 3

French examples:
- "le prix est très important" = price_weight 5
- "le confort est secondaire" = comfort_weight 2
- "le confort est négligeable" = comfort_weight 1

Example:

Input:
Je pars à Paris avec ma famille budget 180 euros piscine parking

Output:
{
    "city": "Paris",
    "travelers": 4,
    "adults": 2,
    "children": 2,
    "rooms": 2,
    "budget": 180,
    "check_in": "2026-08-10",
    "check_out": "2026-08-15",
    "nights": 5,
    "amenities": ["pool", "parking"],
    "price_weight": 3,
    "comfort_weight": 3
}

User request:
""" + prompt

    print("===== PROMPT ENVOYÉ =====")
    print(full_prompt)

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b:free",
        messages=[
            {
                "role": "user",
                "content": full_prompt
            }
        ],
        temperature=0
    )

    print("===== RESPONSE BRUTE =====")
    print(response)

    message = response.choices[0].message

    print("===== MESSAGE =====")
    print(message)

    text = message.content

    if isinstance(text, list):
        text = "".join([
            part.text if hasattr(part, "text") else str(part)
            for part in text
        ])

    text = str(text).strip()

    print("===== CONTENT CLEAN =====")
    print(text)

    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(text)
        print("JSON OK :", parsed)
        return parsed

    except Exception as e:
        print("JSON ERROR:", e)
        print("RAW:", repr(text))

        return {
            "error": str(e),
            "raw_response": text
        }


if __name__ == "__main__":
    result = parse_prompt(
        "Je pars à Barcelone avec 2 adultes et 2 enfants budget 250€"
    )
    print(result)