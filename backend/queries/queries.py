from pymongo.asynchronous.collection import AsyncCollection
from datetime import datetime
from typing import List
from models.mongodb_models import Tweet
from models.rest_response_models import TopCountryResponse, TweetResponse, UserTweetCountsResponse, TopHashtagsResponse, EngagementBreakdownResponse, TweetResponse

async def query_top_countries(tweets_collection: AsyncCollection) -> List[TopCountryResponse]:
    """
    Query to get a sorted list of countries with the most tweets, along with their counts.
    """
    pipeline = [
        {
            "$match": {
                "place.country": {
                    "$exists": True,
                    "$ne": None
                }
            }
        },
        {
            "$group": {
                "_id": "$place.country",
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {"count": -1}
        },
        {
            "$project": {
                "_id": 0,
                "country": "$_id",
                "count": 1
            }
        }
    ]

    try:
        response = await tweets_collection.aggregate(pipeline)
        top_countries = [TopCountryResponse(**doc) async for doc in response]
    except Exception as e:
        print(f"Error occurred while querying top countries: {e}")
        raise e

    return top_countries

async def query_most_active_users(tweets_collection: AsyncCollection) -> List[UserTweetCountsResponse]:
    """
    Query to get a sorted list of users with the most tweets, along with their counts.
    """
    pipeline = [
        {
            "$group": {
                "_id": "$user.id",
                "user_name": {"$first": "$user.name"},
                "screen_name": {"$first": "$user.screen_name"},
                "tweet_count": {"$sum": 1}
            }
        },
        {
            "$sort": {"tweet_count": -1}
        },
        {
            "$limit": 50
        },
        {
            "$project": {
                "_id": 0,
                "user_id": "$_id",
                "user_name": 1,
                "screen_name": 1,
                "tweet_count": 1
            }
        }
    ]
    try:
        response = await tweets_collection.aggregate(pipeline)
        active_users = [UserTweetCountsResponse(**doc) async for doc in response]
    except Exception as e:
        print(f"Error occurred while querying most active users: {e}")
        raise e
    
    return active_users

async def query_top_hashtags(tweets_collection: AsyncCollection) -> List[TopHashtagsResponse]:
    """
    Query to get a sorted list of the most used hashtags, along with their counts.
    """
    pipeline = [
        {
            "$unwind": "$entities.hashtags"
        },
        {
            "$addFields": {
                "hashtag": {
                    "$toLower": "$entities.hashtags.text"
                }
            }
        },
        {
            "$group": {
                "_id": "$hashtag",
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {"count": -1}
        },
        {
            "$limit": 100
        },
        {
            "$project": {
                "_id": 0,
                "hashtag": "$_id",
                "count": 1
            }
        }
    ]

    try:
        response = await tweets_collection.aggregate(pipeline)
        top_hashtags = [TopHashtagsResponse(**doc) async for doc in response]
    except Exception as e:
        print(f"Error occurred while querying top hashtags: {e}")
        raise e
    
    return top_hashtags

async def query_engagement_breakdown(tweets_collection: AsyncCollection) -> List[EngagementBreakdownResponse]:
    """
    Query to get a breakdown of the percentage of simple tweets, retweets, quote tweets, and replies for verified users. The response includes the user's name, screen name, total number of tweets, and the percentage breakdown of each engagement type.
    """
    pipeline = [
        {"$match": {"user.verified": True}},
        {"$group": {
            "_id": "$user.id",
            "user_name":   {"$first": "$user.name"},
            "screen_name": {"$first": "$user.screen_name"},
            "total":   {"$sum": 1},
            "retweets":{"$sum": {"$cond": [{"$regexMatch": {"input": "$text", "regex": "^RT @"}}, 1, 0]}},
            "quotes":  {"$sum": {"$cond": [{"$and": [{"$not": [{"$regexMatch": {"input": "$text", "regex": "^RT @"}}]}, {"$eq": ["$is_quote_status", True]}]}, 1, 0]}},
            "replies": {"$sum": {"$cond": [{"$and": [{"$not": [{"$regexMatch": {"input": "$text", "regex": "^RT @"}}]}, {"$ne": ["$is_quote_status", True]}, {"$ne": ["$in_reply_to_status_id", None]}]}, 1, 0]}},
            "simples": {"$sum": {"$cond": [{"$and": [{"$not": [{"$regexMatch": {"input": "$text", "regex": "^RT @"}}]}, {"$ne": ["$is_quote_status", True]}, {"$eq": ["$in_reply_to_status_id", None]}]}, 1, 0]}},
        }},
        {"$project": {
            "_id": 0,
            "user_name": 1,
            "screen_name": 1,
            "total_tweets": "$total",
            "simple_percent":  {"$multiply": [{"$divide": ["$simples",  "$total"]}, 100]},
            "retweet_percent": {"$multiply": [{"$divide": ["$retweets", "$total"]}, 100]},
            "quote_percent":   {"$multiply": [{"$divide": ["$quotes",   "$total"]}, 100]},
            "reply_percent":   {"$multiply": [{"$divide": ["$replies",  "$total"]}, 100]},
        }},
        {"$sort": {"total_tweets": -1}}
    ]

    try:
        response = await tweets_collection.aggregate(pipeline)
        engagement_breakdown = [EngagementBreakdownResponse(**doc) async for doc in response]
    except Exception as e:
        print(f"Error occurred while querying engagement breakdown: {e}")
        raise e
    
    return engagement_breakdown

async def get_tweets_by_screen_name(username: str, tweets_collection: AsyncCollection) -> List[TweetResponse]:

    def parse_created_at(created_at: object) -> datetime:
        if isinstance(created_at, datetime):
            return created_at
        if isinstance(created_at, str):
            return datetime.strptime(created_at, "%a %b %d %H:%M:%S %z %Y")
        raise ValueError(f"Unsupported created_at value: {created_at!r}")

    query: dict[str, dict] = {
        "user.screen_name": {"$regex": f"^{username}$", "$options": "i"}
    }
    
    try:
        response = tweets_collection.find(query)
        tweets = []
        async for doc in response:
            user = doc.get("user") or {}
            metrics = doc.get("metrics") or {}
            tweets.append(
                TweetResponse(
                    id=doc.get("id", 0),
                    screen_name=user.get("screen_name", ""),
                    verified=bool(user.get("verified", False)),
                    created_at=parse_created_at(doc.get("created_at")),
                    text=doc.get("text", ""),
                    likes=int(metrics.get("likes", 0)),
                    retweets=int(metrics.get("retweets", 0)),
                    quotes=int(metrics.get("quotes", 0)),
                    favorites=int(metrics.get("favorites", 0)),
                )
            )
    except KeyError as e:
        raise ValueError(
            f"Tweet document for user '{username}' is missing expected field: {e.args[0]}"
        ) from e
    except Exception as e:
        print(f"Error occurred while querying tweet query: {e}")
        raise e
    return tweets
