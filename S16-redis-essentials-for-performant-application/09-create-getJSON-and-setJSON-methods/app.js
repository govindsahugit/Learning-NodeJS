import redisClient from "./redis.js";

const res1 = await redisClient.setJSON("test", { user: "Gitesh" });

const res2 = await redisClient.getJSON("test");

console.log(res2);

redisClient.quit();
