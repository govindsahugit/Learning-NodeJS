import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();

const userCollection = db.collection("users");

// const users = await userCollection.find().toArray();
// console.log(users);

const upsertUser = await userCollection.updateOne(
  { name: "Poojs" },
  { $set: { age: 20 } },
  { upsert: true }
);
console.log(upsertUser);

await client.close();
