import express from "express";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminUserDirRoutes from "./routes/adminUserDirRoutes.js";
import adminUserFileRoutes from "./routes/adminUserFileRoutes.js";
import publicRoutes from "./routes/publicRoutes.js";
import cors from "cors";
import { CheckAuth } from "./middlewares/authMiddleware.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

await connectDB();

const app = express();
const port = 4000;

app.use(
  cors({
    origin: ["http://192.168.1.10:5173", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_PARSER_SESSION_KEY));

app.use(express.json());

app.use(express.static("storage"));

app.use("/directory", CheckAuth, directoryRoutes);

app.use("/file", CheckAuth, fileRoutes);

app.use("/", userRoutes);

app.use("/", adminRoutes);

app.use("/admin", CheckAuth, adminUserDirRoutes);

app.use("/admin", CheckAuth, adminUserFileRoutes);

app.use("/public", publicRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json({
    error: "Something went wrong",
  });
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
