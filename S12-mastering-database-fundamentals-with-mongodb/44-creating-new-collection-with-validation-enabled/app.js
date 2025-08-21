import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");

await client.connect();

const db = client.db();

// const collections = await db.listCollections({ name: "users" }).toArray();
// console.log(collections);

// await db.command({
//   create: "users",
//   validator: {
//     name: {
//       $type: "string",
//     },
//     age: {
//       $type: "int",
//     },
//   },
// });

await db.createCollection("users", {
  validator: {
    name: {
      $type: "string",
    },
    age: {
      $type: "int",
    },
  },
});

await client.close();
