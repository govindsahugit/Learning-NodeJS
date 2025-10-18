import { createClient } from "redis";

const redisClient = await createClient().connect();

// const res = await redisClient.set("name", "Govind Sahu");
const res = await redisClient.get("name", "Govind Sahu");

console.log(res);

redisClient.quit();
