import redisClient from "./redis.js";

// const res = await redisClient.json.set("user:1", "$.name", "Prateek Kaiwart");

// const res = await redisClient.json.get("user:1", {
//   path: "$.name",
// });

// const res = await redisClient.json.get("user:1", {
//   path: "$.hobbies[*]",
// });

const res = await redisClient.json.get("user:1", {
  path: "$..name",
});

console.log(res);

redisClient.quit();
