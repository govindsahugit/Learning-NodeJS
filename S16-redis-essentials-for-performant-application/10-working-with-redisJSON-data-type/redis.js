import { createClient } from "redis";

const redisClient = await createClient().connect();

redisClient.on("error", (err) => console.log("Redis Client Error: ", err));

redisClient.getJSON = async function (key) {
  const data = await this.get(key);
  return JSON.parse(data);
};

redisClient.setJSON = async function (key, data) {
  return await this.set(key, JSON.stringify(data));
};

export default redisClient;
