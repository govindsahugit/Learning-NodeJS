import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://127.0.0.1:27017/storageApp");

export const connectDB = async () => {
  await client.connect();
  console.log("Mongodb connected");
  const db = client.db();
  return db;
};

process.on("SIGINT", async () => {
  await client.close();
  console.log("DB client disconnected");
  process.exit(0);
});
