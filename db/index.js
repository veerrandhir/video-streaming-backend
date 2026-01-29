import mongoose from "mongoose";

import { DB_Name } from "../constants.js";

// Step to connect DB -> import -> mongoose.connect(env) -> Handle error
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI} /${DB_Name}`,
    );
    console.log(
      `\n MONGODB Connected  !! DB_Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MONGODB Connection FAIELD", error);
    process.exit(1);
  }
};
