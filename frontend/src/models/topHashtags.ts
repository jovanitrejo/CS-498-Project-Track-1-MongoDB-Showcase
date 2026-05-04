/**
 * Model which is used to represent a hashtag count. Used to serailize response of top hashtags in our dataset.
 */
export default interface Hashtag {
  hashtag: string;
  count: number;
}
