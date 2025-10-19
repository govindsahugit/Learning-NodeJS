import { createClient } from "redis";

const redisClient = await createClient().connect();

redisClient.on("error", (err) => console.log("Redis Client Error: ", err));

export default redisClient;
