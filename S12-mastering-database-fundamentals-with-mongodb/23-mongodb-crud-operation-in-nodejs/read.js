import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("test");
const collectionList = await db.listCollections().toArray()
const collection = db.collection("users");

// Read 
const users1 = await collection.find().toArray()
console.log(users1);
const users2 = await collection.find({info: {$type: 3}}).toArray()
console.log(users2);

client.close()