# Query Info
Our following MongoDB system utilizes the [Twitter data from the 2018 Eurovision final](https://www.kaggle.com/datasets/patrickjoan/twitter-data-from-2018-eurovision-final), which was provided by Patrick Joan. In the PDF provided by Stage 2, we were asked to implement **4** of our 6 queries. We chose to implement the following:

1. From which country have the tweets been most actively posted (most number of tweets)?
   - This query is served on the `/top-countries` endpoint of our FastAPI backend server.
2. Which user has posted the most tweets?
   - This query is served on the `/top-users` endpoint of our FastAPI backend server.
3. How many tweets are associated with each hashtag? (For a tweet with multiple hashtags, count it for each.) Give the hashtag and count for the top 100 counts.
   - This query is served on the `/top-hashtags` endpoint of our FastAPI backend server.
4. (Nature of engagement) For each verified user, what is the percentage of different types of tweets (simple tweet, reply, retweet, quoted tweet) compated to his or her overall number of tweets?
   - This query is served on the `/engagement-breakdown` endpoint of our FastAPI backend server.