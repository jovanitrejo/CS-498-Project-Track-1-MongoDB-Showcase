export default interface TweetResponse {
    id: number;
    screen_name: string;
    verified: boolean;
    created_at: Date;
    text: string;
    likes: number;
    retweets: number;
    quotes: number;
    favorites: number;
}