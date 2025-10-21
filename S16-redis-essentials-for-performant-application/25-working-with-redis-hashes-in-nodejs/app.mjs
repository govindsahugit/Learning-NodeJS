import { createClient } from "redis";

const redisClient = await createClient().connect();

console.log(await redisClient.hGet("userHash", "age"));

redisClient.quit();
