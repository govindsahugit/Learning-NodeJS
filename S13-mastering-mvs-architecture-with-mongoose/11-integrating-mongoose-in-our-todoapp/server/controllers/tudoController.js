import { ObjectId } from "mongodb";
import Todo from "../models/todoModel.js";

export const createTudo = async (req, res) => {
  const { name } = req.body;
  try {
    await Todo.create({ name });
    res.redirect("/todos");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getAllTudos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("Index", { todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const getSingleTudo = async (req, res) => {
  try {
    const todos = await req.db
      .collection("todos")
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const updateTudo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndUpdate(id, { completed: true });
    res
      .status(200)
      .json({ success: true, message: "Todo updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTudo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
