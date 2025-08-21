import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();

db.command({
  collMod: "users",
  validator: {
    name: {
      $type: "string",
    },
    age: {
      $type: "int",
    },
  },
});

// const collections = await db.listCollections({ name: "users" }).toArray();
// console.log(collections);

try {
  const userCollection = db.collection("users");
  const insertUser = await userCollection.insertOne({
    name: "Dinki",
    age: "19",
  });
  console.log(insertUser);
} catch (error) {
  console.log(error);
}

await client.close();
