import React from "react";
import Layout from "./Layout";

const Index = ({ todos }) => {
  return (
    <Layout>
      <form action="/todos" method="post">
        <input placeholder="Add a new Todo" type="text" name="name" required />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id.toString()}>
            <span>{todo.name}</span> <span>{todo.completed ? "✅" : "❌"}</span>
            <button
              data-id={todo._id.toString()}
              id="delete"
              style={{
                border: "none",
                color: "white",
                backgroundColor: "#be4d25",
                padding: "1px 2px",
                borderRadius: "2px",
              }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Index;
