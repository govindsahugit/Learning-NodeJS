import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017/");

await client.connect();

// const db = client.db()

// const collectionsList = await db.listCollections().toArray()
// console.log(collectionsList);

// const collection = db.collection("users")
// const users = await collection.find().toArray()
// console.log(users);

// ============================================= //

// const db = client.db("expenseApp");

// const collectionsList = await db.listCollections().toArray();

// const collection = db.collection("expanses");

// const expanses = await collection.find().toArray();
// console.log(expanses);

// =================================== //

const admin = client.db().admin();
const dbs = await admin.listDatabases();

console.log(dbs);

client.close();
