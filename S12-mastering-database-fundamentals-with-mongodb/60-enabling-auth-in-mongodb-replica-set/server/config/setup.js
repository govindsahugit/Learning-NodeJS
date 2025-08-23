import { client, connectDB } from "./db.js";

try {
  const command = "collMod";
  const db = await connectDB();

  await db.command({
    [command]: "users",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "email", "password", "rootDirId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            minLength: 2,
            description: "Name should be longer than three charactors",
          },
          email: {
            bsonType: "string",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
            description: "Please enter a valid email!",
          },
          password: {
            bsonType: "string",
            minLength: 4,
          },
          rootDirId: {
            bsonType: "objectId",
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "directories",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "parentDir", "userId"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            description: "Name should be longer than three charators",
          },
          parentDirId: {
            bsonType: ["objectId", "null"],
          },
          userId: {
            bsonType: "objectId",
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });

  await db.command({
    [command]: "files",
    validator: {
      $jsonSchema: {
        required: ["_id", "name", "parentDirId", "userId", "extention"],
        properties: {
          _id: {
            bsonType: "objectId",
          },
          name: {
            bsonType: "string",
            description: "Name should be longer than three charator",
          },
          parentDirId: {
            bsonType: "objectId",
          },
          userId: {
            bsonType: "objectId",
          },
          extention: {
            bsonType: "string",
          },
        },
        additionalProperties: false,
      },
    },
    validationAction: "error",
    validationLevel: "strict",
  });
} catch (error) {
  console.log("Something went wrong while setting up database!".error);
}
await client.close();
