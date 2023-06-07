export default interface RateLimiterInterface {
  init(timeFrame: number, maxRequests: number, opts: any): any;
}
