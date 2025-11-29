// src/lib/rateLimit.ts
import RateLimit from "next-rate-limit";

export const rateLimit = RateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500, // Max 500 unique IPs per interval
});
