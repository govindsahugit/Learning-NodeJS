import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

const db = client.db("school2");

const studentsCollection = db.collection("students");
const teachersCollection = db.collection("teachers");

// Delete
// const result1 = await studentsCollection.drop(); // Deleting students collection
// console.log(result1);

// const result2 = await teachersCollection.deleteOne({
//   _id: new ObjectId("68a31511e538231e76cca54a"),
// }); // Deleting a teacher    from teachers collection
// console.log(result2);

// const result3 = await teachersCollection.updateOne(
//   { name: "Vishnu" },
//   { $unset: { age: "" } }
// ); // Deleting a single property or field from document
// console.log(result3);

const result4 = await db.dropDatabase(); // Deleting a database from server
console.log(result4);

client.close();
