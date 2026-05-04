import axios, { type AxiosResponse } from "axios";
import type EngagementBreakdownResponse from "../models/engagementBreakdown";
import type ActiveUserResponse from "../models/activeUserResponse";
import type Hashtag from "../models/topHashtags";
import type TopCountry from "../models/topCountry";
import type TweetResponse from "../models/tweetResponse";

/**
 * Contacts the backend API to retrieve the engagement breakdown for verified users. This function makes a GET request to the `/engagement-breakdown` endpoint and returns the data as an array of EngagementBreakdownResponse objects.
 * @returns An array of EngagementBreakdownResponse objects, which represent the engagement breakdown for each verified user in the dataset.
 */
export const getEngagementBreakdown = async (): Promise<
  EngagementBreakdownResponse[]
> => {
  try {
    const response: AxiosResponse<EngagementBreakdownResponse[]> =
      await axios.get("/engagement-breakdown");
    return response.data;
  } catch (error) {
    console.error("Error fetching engagement breakdown!", { cause: error });
    throw error;
  }
};

/**
 * Contacts backend API to retrieve the most active users in the past 24 hours. This function makes a GET request to the `/active-users` endpoint and returns the data as an array of ActiveUserResponse objects.
 * @returns An array of ActiveUserResponse objects
 */
export const getMostActiveUsers = async (): Promise<ActiveUserResponse[]> => {
  try {
    const response: AxiosResponse<ActiveUserResponse[]> =
      await axios.get("/most-active-users");
    return response.data;
  } catch (error) {
    console.error("Error fetching most active users!", { cause: error });
    throw error;
  }
};

/**
 * Contacts backend API to retrieve the top countries by tweet count in the dataset. This function makes a GET request to the `/top-countries` endpoint and returns the data as an array of TopCountry objects.
 * @returns An array of TopCountry objects, which represent the top countries by tweet count in the dataset.
 */
export const getTopCountries = async (): Promise<TopCountry[]> => {
  try {
    const response: AxiosResponse<TopCountry[]> =
      await axios.get("/top-countries");
    return response.data;
  } catch (error) {
    console.error("Error fetching top countries!", { cause: error });
    throw error;
  }
};

/**
 * Contacts backend API to retrieve the top hashtags by count in the dataset. This function makes a GET request to the `/top-hashtags` endpoint and returns the data as an array of Hashtag objects.
 * @returns An array of Hashtag objects, which represent the top hashtags by count in the dataset.
 */
export const getTopHashtags = async (): Promise<Hashtag[]> => {
  try {
    const response: AxiosResponse<Hashtag[]> =
      await axios.get("/top-hashtags");
    return response.data;
  } catch (error) {
    console.error("Error fetching top hashtags!", { cause: error });
    throw error;
  }
};

export const getTweetsByUsername = async (username: string): Promise<TweetResponse[]> => {
  try {
    const response: AxiosResponse<TweetResponse[]> = await axios.get("/tweets", {
      params: { username }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tweets by username!", { cause: error });
    throw error;
  }
}