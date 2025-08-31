import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb://admin:admin@localhost:27017/todoApps?authSource=admin"
  );
  console.log("Database Connected");
} catch (error) {
  console.log(error.message);
  process.exit(1);
}

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Client Disconnected!");
  process.exit(0);
});
