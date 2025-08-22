import express from "express";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookie from "cookie-parser";
import { CheckAuth } from "./middlewares/Auth.js";
import { connectDB } from "./config/db.js";

try {
  const db = await connectDB();
  console.log(db.databaseName);

  const app = express();
  const port = 4000;

  app.use(
    cors({
      origin: "http://192.168.1.10:5173",
      credentials: true,
    })
  );

  app.use(cookie());

  app.use(express.json());

  app.use(express.static("storage"));

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use("/directory", CheckAuth, directoryRoutes);

  app.use("/file", CheckAuth, fileRoutes);

  app.use("/user", userRoutes);

  app.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 500).json({
      error: "Something went wrong",
    });
  });

  app.listen(port, () => {
    console.log("Server is running on port 4000");
  });
} catch (err) {
  console.log("Failed to connect db");
}
