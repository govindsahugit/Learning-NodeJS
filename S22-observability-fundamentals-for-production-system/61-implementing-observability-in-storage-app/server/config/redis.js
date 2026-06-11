import { createClient } from "redis";

const redisClient = await createClient({
  url: process.env.REDIS_CONNECTION_URL,
  password: process.env.REDIS_PASSWORD,
}).connect();

redisClient.on("error", (err) => console.log(`Error In Redis: ${err}`));

export default redisClient;
