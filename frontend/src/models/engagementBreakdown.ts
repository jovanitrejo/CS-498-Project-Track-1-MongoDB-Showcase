/**
 * A response model expected from calling the endpoint `/engagement-breakdown` on custom backend.
 */
export default interface EngagementBreakdownResponse {
  user_name: string;
  screen_name: string;
  total_tweets: number;
  simple_percent: number;
  retweet_percent: number;
  quote_percent: number;
  reply_percent: number;
}
