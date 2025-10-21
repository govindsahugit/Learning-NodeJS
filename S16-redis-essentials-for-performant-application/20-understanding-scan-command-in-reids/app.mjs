import { createClient } from "redis";

const redisClient = await createClient().connect();

let cursor = "0";
do {
  const { cursor: nextCursor, keys } = await redisClient.scan(cursor, {
    MATCH: "user:*",
  });
  console.log(nextCursor);
  console.log(keys);
  cursor = nextCursor;
} while (cursor !== "0");

redisClient.quit();
