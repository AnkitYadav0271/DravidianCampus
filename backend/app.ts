import { configDotenv } from "dotenv";
import helmet from "helmet";
configDotenv();
import { rateLimit } from "express-rate-limit";

import express from "express";
import cors from "cors";
import emailRouter from "./src/routes/email.routes.ts";

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use(limit);
app.use(
  cors({
    origin: ["https://dravidiancampus.com", "https://www.dravidiancampus.com"],
  }),
);

app.use("/", emailRouter);

app.listen(8000, () => {
  console.log("App is running on port:8000");
});
