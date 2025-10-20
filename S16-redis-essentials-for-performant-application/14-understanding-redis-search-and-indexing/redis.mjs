import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => {
  console.log("Redis Client Error", err);
  process.exit(1);
});

await redisClient.connect();

await redisClient.ft.dropIndex("ageIdx");
console.log(await redisClient.ft._list());

redisClient.quit();

export default redisClient;
