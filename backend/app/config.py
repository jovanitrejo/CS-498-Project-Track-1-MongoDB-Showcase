from pathlib import Path
from pymongo import AsyncMongoClient

MONGO_SECRET_PATH = Path("/secrets/db/conn_string")


def get_mongo_uri() -> str:
    uri = MONGO_SECRET_PATH.read_text().strip()

    if not uri:
        raise RuntimeError("MongoDB secret file is empty")

    return uri


client = AsyncMongoClient(get_mongo_uri())