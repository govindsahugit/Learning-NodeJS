import express from "express";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a new to-do item
router.post("/", async (req, res) => {
  const todo = req.body;
  try {
    const result = await req.db.collection("todos").insertOne(todo);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Get all to-do items
router.get("/", async (req, res) => {
  try {
    const todos = await req.db.collection("todos").find().toArray();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Get single to-do item
router.get("/:id", async (req, res) => {
  try {
    const todos = await req.db
      .collection("todos")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Update a to-do item
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;
  try {
    const result = await req.db
      .collection("todos")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedTodo });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Not updated" });
    }
    res.status(200).json({ message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete a to-do item
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await req.db
      .collection("todos")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

export default router;
