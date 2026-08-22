import { Redis } from '@upstash/redis'
import dotenv from "dotenv"


const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL)


// Redis is like a key-value store, think of it like a json
await redis.set("foo", "bar");
await redis.get("foo");