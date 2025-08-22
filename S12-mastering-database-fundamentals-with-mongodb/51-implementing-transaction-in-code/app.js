import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();
console.log("Connected!");

const db = client.db();

const session = client.startSession();
session.startTransaction();

const directories = db.collection("directories");
const users = db.collection("users");

try {
  await directories.insertOne({ name: "db", userName: "GS" }, { session });
  await users.insertOne({ name: "GS", rootDirName: "db" }, { session });

  await session.commitTransaction();
} catch (error) {
  console.log(error);
  await session.abortTransaction();
}

await client.close();
console.log("Disconnected");
