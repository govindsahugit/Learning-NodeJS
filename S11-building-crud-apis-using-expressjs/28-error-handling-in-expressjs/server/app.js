import express from "express";
import directoryRoutes from "./routes/directoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());

app.use(express.static("storage"));

app.use("/directory", directoryRoutes);

app.use("/file", fileRoutes);

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    message: "Something went wrong"
  })
})

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
