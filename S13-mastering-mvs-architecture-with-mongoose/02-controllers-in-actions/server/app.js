import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import { connectDB } from "./db.js";

const app = express();

const db = await connectDB();

app.use(express.json());
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/todos", todoRoutes);

app.listen(4000, () => {
  console.log(`Server is running`);
});
