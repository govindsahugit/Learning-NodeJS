import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

// Create
const db = client.db("school2"); // Here we are creating new database with collections and documents
const studentsCollection = db.collection("students")
const teachersCollection = db.collection("teachers")

const studentsResult = await studentsCollection.insertOne({name: "Nikhil Sahu", age: 19})
const teachersResult = await teachersCollection.insertMany([{name: "Anurage", age: 25}, {name: "Vishnu", age: "26"}])

console.log(studentsResult);
console.log(teachersResult);

client.close()