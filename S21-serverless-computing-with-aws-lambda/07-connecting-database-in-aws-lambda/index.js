import { MongoClient, ObjectId } from "mongodb";

const mongodbUrl = process.env.MONGODB_CONNECTION_URL;

const client = new MongoClient(mongodbUrl);
const db = client.db();
const col = db.collection("todos");

const json = ({ statusCode, data }) => ({
  statusCode,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(data),
});

const isValidId = (id) =>
  ObjectId.isValid(id) && String(new ObjectId(id)) === id;

export async function handler(event) {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  // GET /todos
  if (method === "GET" && path === "/todos") {
    const todos = await col.find({}).toArray();
    return json({ statusCode: 200, data: todos });
  }

  // GET /todos/{id}
  else if (method === "GET" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];

    if (!isValidId(id)) return json(400, { message: "Invalid id" });

    const todo = await col.findOne({ _id: new ObjectId(id) });
    return json({
      statusCode: 200,
      data: todo,
    });
  }

  // POST /todos
  else if (method === "POST" && path === "/todos") {
    const body = JSON.parse(event.body || "{}");

    const doc = {
      title: body.title,
      done: false,
    };

    const res = await col.insertOne(doc);

    return json({
      statusCode: 201,
      data: {
        id: String(res.insertedId),
        title: doc.title,
        done: doc.done,
      },
    });
  }

  // PUT /todos/{id}
  else if (method === "PUT" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];

    if (!isValidId(id)) return json(400, { message: "Invalid id" });

    const body = JSON.parse(event.body || "{}");

    const todo = await col.updateOne(
      { _id: new ObjectId(id) },
      { $set: { title: body.title, done: body.done } }
    );

    return json({
      statusCode: 201,
      data: {
        id,
      },
    });
  }

  // DELETE /todos/{id}
  else if (method === "DELETE" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];

    if (!isValidId(id)) return json(400, { message: "Invalid id" });

    await col.deleteOne({ _id: new ObjectId(id) });

    return json({
      statusCode: 200,
      data: {
        message: "Todo deleted successfully!",
      },
    });
  }
  return { statusCode: 404 };
}
