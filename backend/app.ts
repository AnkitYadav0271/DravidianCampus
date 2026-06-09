import { configDotenv } from "dotenv";

configDotenv();

import express from "express";
import cors from "cors";
import emailRouter from "./src/routes/email.routes.ts";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "https;//dravidiancampus.com",
      "http://127.0.0.1:5500",
    ],
  }),
);

app.use("/", emailRouter);

app.listen(8000, () => {
  console.log("App is running on port:8000");
});
