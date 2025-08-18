import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("expenseApp");

const collection = db.collection("expanses");

const cursor = collection.find().skip(0).limit(0).sort({ title: 1 });

const data = await cursor.toArray();

data.map(({ title, amount }) => console.log({ title, amount }));

client.close();
