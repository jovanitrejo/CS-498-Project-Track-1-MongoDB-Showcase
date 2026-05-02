from typing import Any
from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
app: FastAPI = FastAPI()
from dotenv import load_dotenv
from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase
from pymongo.asynchronous.collection import AsyncCollection
import os

load_dotenv() # load environment variables from .env file

@asynccontextmanager
async def db_lifespan(app: FastAPI):
    # Create a MongoDB client and connect to the database
    uri: str | None = os.getenv("MONGO_URI")
    if uri is None:
        raise ValueError("MONGO_URI environment variable is not set")
    mongo_client: AsyncMongoClient[dict[str, Any]] = AsyncMongoClient(uri)
    twitter: AsyncDatabase = mongo_client["twitter"]
    tweets: AsyncCollection = twitter["tweets"]
    app.state.mongo_client = mongo_client
    app.state.twitter = twitter
    app.state.tweets = tweets

    try:
        yield
    finally:
        await mongo_client.close()

app: FastAPI = FastAPI(lifespan=db_lifespan)   

@app.get("/")
async def read_root():
    return {"Hello": "World"}