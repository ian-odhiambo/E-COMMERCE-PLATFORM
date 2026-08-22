import { Redis } from '@upstash/redis'
import dotenv from "dotenv"


const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL)

// await redis.set("foo", "bar");
// await redis.get("foo");