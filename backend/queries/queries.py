from pymongo.asynchronous.collection import AsyncCollection
from typing import List
from models.rest_response_models import TopCountryResponse

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