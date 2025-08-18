import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("school");

const studentsCollection = db.collection("students");

// const res1 = await studentsCollection.updateOne(
//   { _id: new ObjectId("68a314dcc92eb320179a5368") },
//   { $set: { name: "Nikhil" } }
// ); // updating a single field from a document
// console.log(res1);

const res2 = await studentsCollection.replaceOne(
  { _id: new ObjectId("68a314dcc92eb320179a5368") },
  { name: "Nikhil Sahu", class: "B.com" }
); // replacing a object from a document
console.log(res2);

client.close();
