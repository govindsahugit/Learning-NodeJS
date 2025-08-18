import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("todoApp");

const collection = db.collection("todos");

const cursor = collection.find();

for await (const documents of cursor) {
  console.log(documents);
  if ((documents.title === "Tast 24")) {
    console.log(await cursor.hasNext());
  }
}

client.close();
