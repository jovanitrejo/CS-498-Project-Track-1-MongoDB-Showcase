from pymongo import MongoClient
from dotenv import load_dotenv
import os

def test_connection():
    """
    This python file tests to check if the MONGODB_CONN env variable is set correctly and can be used to connect to the custom GCP MongoDB instance.
    """
    uri: str | None = os.getenv("MONGO_URI")
    if uri is None:
        raise ValueError("MONGO_URI environment variable is not set")
    client: MongoClient = MongoClient(uri)
    try:
        client.admin.command('ping')
        print("Successfully connected!")
    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        client.close()