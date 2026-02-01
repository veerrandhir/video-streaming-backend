import dotenv from "dotenv";

import connectDB from "../db";

import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB() //if db connect then fire call back to listen express fn
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `@ Connected server is listining at port: ${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Failed !!! ", err);
  });
