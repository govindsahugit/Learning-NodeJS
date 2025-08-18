import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("todoApp");

const collection = db.collection("todos");

const cursor = collection.find().batchSize(50);

const data = await cursor.toArray();
data.map(({ title, completed }) => console.log({ title, completed }));

client.close();
