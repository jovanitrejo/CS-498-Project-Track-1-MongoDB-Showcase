/**
 * A model that is to be used to represent the response from the endpoint `/active-users` on the custom backend. This endpoint is expected to return a list of users who have tweeted the most in the past 24 hours, along with their tweet counts.
 */
export default interface ActiveUserResponse {
  user_id: number;
  user_name: string;
  screen_name: string;
  tweet_count: number;
}
