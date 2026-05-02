from typing import Any, List
from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager

from models.rest_response_models import TopCountryResponse
from queries.queries import query_top_countries
from dotenv import load_dotenv
from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase
from pymongo.asynchronous.collection import AsyncCollection
import os

load_dotenv() # load environment variables from .env file
app: FastAPI = FastAPI() # create FastAPI app instance


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

# Simple root endpoint for a heartbeat check
@app.get("/", response_model=dict[str, str])
async def read_root():
    return {"Hello": "World"}

@app.get("/top-countries", response_model=List[TopCountryResponse])
async def get_top_countries() -> List[TopCountryResponse]:
    """
    Endpoint to get a sorted list of countries with the most tweets, along with their counts.
    """
    tweets_collection: AsyncCollection = app.state.tweets
    top_countries = await query_top_countries(tweets_collection)
    return top_countries
