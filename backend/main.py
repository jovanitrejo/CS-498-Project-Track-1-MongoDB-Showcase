import os
from typing import Any, List

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from pymongo import AsyncMongoClient
from pymongo.asynchronous.collection import AsyncCollection
from pymongo.asynchronous.database import AsyncDatabase

from models.rest_response_models import (
    EngagementBreakdownResponse,
    TopCountryResponse,
    TopHashtagsResponse,
    UserTweetCountsResponse,
)
from queries.queries import (
    query_engagement_breakdown,
    query_most_active_users,
    query_top_countries,
    query_top_hashtags,
)

load_dotenv()  # load environment variables from .env file


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
async def get_top_countries() -> List[TopCountryResponse] | dict[str, str]:
    """
    Endpoint to get a sorted list of countries with the most tweets, along with their counts.
    """
    tweets_collection: AsyncCollection = app.state.tweets
    try:
        top_countries = await query_top_countries(tweets_collection)
    except Exception as e:
        print(f"Error occurred while getting top countries: {e}")
        return {
            "error": "An error occurred while fetching top countries.",
            "details": str(e),
        }
    return top_countries


@app.get("/most-active-users", response_model=List[UserTweetCountsResponse])
async def get_most_active_users() -> List[UserTweetCountsResponse] | dict[str, str]:
    """
    Endpoint to get a sorted list of users with the most tweets, along with their counts.
    """
    tweets_collection: AsyncCollection = app.state.tweets
    try:
        most_active_users = await query_most_active_users(tweets_collection)
    except Exception as e:
        print(f"Error occurred while getting most active users: {e}")
        return {
            "error": "An error occurred while fetching most active users.",
            "details": str(e),
        }
    return most_active_users


@app.get("/top-hashtags", response_model=List[TopHashtagsResponse])
async def get_top_hashtags() -> List[TopHashtagsResponse] | dict[str, str]:
    """
    Endpoint to get a sorted list of the most popular hashtags, along with their counts.
    """
    tweets_collection: AsyncCollection = app.state.tweets
    try:
        top_hashtags = await query_top_hashtags(tweets_collection)
    except Exception as e:
        print(f"Error occurred while getting top hashtags: {e}")
        return {
            "error": "An error occurred while fetching top hashtags.",
            "details": str(e),
        }
    return top_hashtags


@app.get("/engagement-breakdown", response_model=List[EngagementBreakdownResponse])
async def get_engagement_breakdown() -> (
    List[EngagementBreakdownResponse] | dict[str, str]
):
    """
    Endpoint to get a breakdown of engagement types (simple, retweet, quote, reply) for each user, along with their percentages.
    """
    tweets_collection: AsyncCollection = app.state.tweets
    try:
        engagement_breakdown = await query_engagement_breakdown(tweets_collection)
    except Exception as e:
        print(f"Error occurred while getting engagement breakdown: {e}")
        return {
            "error": "An error occurred while fetching engagement breakdown.",
            "details": str(e),
        }
    return engagement_breakdown
