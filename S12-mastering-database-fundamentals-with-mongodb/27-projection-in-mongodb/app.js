import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("expenseApp");

const collection = db.collection("expanses");
// const cursor = collection
//   .find()
//   .map(({ title, amount }) => ({ title, amount }));

const cursor = collection
  .find({}, { projection: { title: 1, amount: 1, _id: 0 } })
  .sort({ title: 1 });

const data = await cursor.toArray();
console.log(data);

client.close();
