import express from "express";
import todoRoutes from "./routes/todoRoutes.js";
import { connectDB } from "./db.js";
import { createEngine } from "express-react-views";

const app = express();

const db = await connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.set("views", "./views");
app.set("view engine", "jsx");
app.engine("jsx", createEngine());

app.use("/todos", todoRoutes);

app.listen(4000, () => {
  console.log(`Server is running`);
});
