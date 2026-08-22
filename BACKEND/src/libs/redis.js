import { Redis } from "@upstash/redis"
import dotenv from "dotenv"
dotenv.config()


const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Example usage
// await redis.set("foo", "bar")
// console.log(await redis.get("foo"))