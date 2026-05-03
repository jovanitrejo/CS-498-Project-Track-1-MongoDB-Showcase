/**
 * This file defines the TopCountry interface, which represents the structure of a top country object in the application. The TopCountry interface includes the following properties:
 * - country: A string representing the name of the country.
 * - tweet_count: A number representing the total count of tweets from that country.
 */
export default interface TopCountry {
  country: string;
  tweet_count: number;
}
