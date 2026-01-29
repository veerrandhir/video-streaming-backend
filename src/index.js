import dotenv from "dotenv";

import connectDB from "../db";

dotenv.config({
  path: "../.env",
});

connectDB() //if db connect then fire call back to listen express fn
  .then(() => {
    app.lieten(process.env.PORT || 8000, () => {
      console.log(
        `@ Connected server is listining at port: ${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log("MONGODB connection Failed !!! ", err);
  });
