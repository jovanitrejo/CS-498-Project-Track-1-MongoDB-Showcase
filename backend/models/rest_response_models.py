from pydantic import BaseModel

class TopCountryResponse(BaseModel):
    country: str
    count: int

class UserTweetCountsResponse(BaseModel):
    user_id: int
    user_name: str
    screen_name: str
    tweet_count: int

class TopHashtagsResponse(BaseModel):
    hashtag: str
    count: int

class EngagementBreakdownResponse(BaseModel):
    user_name: str
    screen_name: str
    total_tweets: int
    simple_percent: float
    retweet_percent: float
    quote_percent: float
    reply_percent: float