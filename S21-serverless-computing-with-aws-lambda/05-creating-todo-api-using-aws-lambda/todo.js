import fs from "fs";

export async function handler(event) {
  const method = event.requestContext.http.method;
  const path = event.rawPath;

  const file = "/temp/todos.json";

  // create file with default todos on first run
  if (!fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      JSON.stringify([
        { id: "1", title: "Learn AWS Lambda", done: false },
        { id: "2", title: "Understand Function URLs", done: true },
        { id: "3", title: "Build Todo API", done: false },
        { id: "4", title: "Deploy without API Gateway", done: false },
      ])
    );
  }

  let todos = JSON.parse(fs.readFileSync(file, "utf8"));

  // GET /todos
  if (method === "GET" && path === "/todos") {
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todos),
    };
  }

  // GET /todos/{id}
  else if (method === "GET" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todos.find(t => t.id === id)),
    };
  }

  // POST /todos
  else if (method === "POST" && path === "/todos") {
    const body = JSON.parse(event.body);
    const todo = { id: String(Date.now()), title: body.title, done: false };
    todos.push(todo);
    fs.writeFileSync(file, JSON.stringify(todos));
    return {
      statusCode: 201,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    };
  }

  // PUT /todos/{id}
  else if (method === "PUT" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];
    const body = JSON.parse(event.body);
    const todo = todos.find(t => t.id === id);

    if (body.title !== undefined) todo.title = body.title;
    if (body.done !== undefined) todo.done = body.done;

    fs.writeFileSync(file, JSON.stringify(todos));
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    };
  }

  // DELETE /todos/{id}
  else if (method === "DELETE" && path.startsWith("/todos/")) {
    const id = path.split("/")[2];
    const index = todos.findIndex(t => t.id === id);
    const deleted = todos.splice(index, 1)[0];
    fs.writeFileSync(file, JSON.stringify(todos));
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(deleted),
    };
  }

  return { statusCode: 404 };
}
