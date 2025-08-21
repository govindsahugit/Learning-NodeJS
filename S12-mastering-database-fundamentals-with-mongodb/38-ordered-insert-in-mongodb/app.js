import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();

const userCollection = db.collection("users");

const insertUsers = await userCollection.insertMany(
  [
    { _id: new ObjectId("68a69b2e62a81acd01e663ad"), name: "Gulshan" },
    { name: "Kunal" },
    { name: "Harsha" },
  ],
  { ordered: false }
);

console.log(insertUsers);

await client.close();
