import "dotenv/config";
import express from "express";
import routes from "./routes/routes.js";

const app = express();

const PORT = 4000;

app.use(express.json());

app.use(express.static("logs"));

app.use("/deploy", routes);

app.use((err, req, res, next) => {
  console.log(err);
  return res.json({
    err,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
