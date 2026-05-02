from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class Tweet(BaseModel):
    id_: str
    id: int
    created_at: datetime
    text: str
    in_reply_to_status_id: Optional[int]
    in_reply_to_user_id: Optional[int]
    in_reply_to_screen_name: Optional[str]
    place: Optional[TweetPlace]
    entities: TweetEntities
    metrics: TweetMetrics
    user: TweetUser

class TweetUser(BaseModel):
    id: int
    name: str
    screen_name: str
    verified: bool

class TweetPlace(BaseModel):
    country: str
    full_name: str
    place_type: str

class TweetEntities(BaseModel):
    hashtags: List[str]

class TweetMetrics(BaseModel):
    likes: int
    retweets: int
    quotes: int
    favorites: int