import pandas as pd

CSV_PATH = "data/residences_v2.csv"

def load_residences():
    df = pd.read_csv(CSV_PATH, encoding="cp1252")
    return df.to_dict(orient="records")