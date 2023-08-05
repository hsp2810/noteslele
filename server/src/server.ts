import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

// ENV variables
const PORT = process.env.PORT || 5000;

const start = async () => {
  // Connect to the database
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected to the database");
  // Start the server
  app.listen(PORT!, () => {
    console.log(`Server started at PORT ${PORT}`);
  });
};

start();
