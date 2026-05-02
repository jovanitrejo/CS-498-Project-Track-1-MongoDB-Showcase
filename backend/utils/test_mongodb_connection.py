from pymongo import AsyncMongoClient, MongoClient
from dotenv import load_dotenv
import os
import asyncio

load_dotenv()
async def test_connection():
    """
    This python file tests to check if the MONGODB_CONN env variable is set correctly and can be used to connect to the custom GCP MongoDB instance.
    """
    uri: str | None = os.getenv("MONGO_URI")
    if uri is None:
        raise ValueError("MONGO_URI environment variable is not set")
    print(f"Testing connection to MongoDB....")
    client: AsyncMongoClient = AsyncMongoClient(uri)
    try:
        await client.server_info()
        print("Successfully connected!")
    except Exception as e:
        print(f"Connection failed: {e}")
    finally:
        await client.close()

if __name__ == "__main__":
    asyncio.run(test_connection())