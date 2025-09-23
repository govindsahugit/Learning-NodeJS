import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://admin:admin@127.0.0.1:27017/storageApp?authSource=admin"
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    console.log("Could Not Connect to the Database");
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("DB client disconnected");
  process.exit(0);
});
