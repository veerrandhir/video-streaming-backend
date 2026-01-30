import express, { json, urlencoded } from "express";

import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.use(express.static("public"));
app.use(cookieParser());

// import router  manchaha name se import kar rha hun ahan kyu ki export default kiye the
import userRouter from "./src/routes/user.routes";

// routes declaration
app.use("/api/v1/users", userRouter);

export { app };
