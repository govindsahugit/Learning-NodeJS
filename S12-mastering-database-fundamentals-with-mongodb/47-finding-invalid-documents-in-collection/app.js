import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();

const collectionInfo = await db.listCollections({ name: "users" }).toArray();

const schema = collectionInfo[0].options.validator.$jsonSchema;

const invalidUsers = await db
  .collection("users")
  .find({ $nor: [{ $jsonSchema: schema }] })
  .toArray();

console.log(invalidUsers);

await client.close();
