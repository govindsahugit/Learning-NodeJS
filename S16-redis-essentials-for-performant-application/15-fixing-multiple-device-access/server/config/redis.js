import { createClient } from "redis";

const redisClient = await createClient().connect();

redisClient.on("error", (err) => console.log(`Error In Redis: ${err}`));

export default redisClient;
