import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
dotenv.config();
import { rateLimit } from "express-rate-limit";
import offerRouter from "./src/routes/offer.route.ts";

import express from "express";
import cors from "cors";
import emailRouter from "./src/routes/email.routes.ts";
import { connectDb } from "./src/db/db.ts";
import authRouter from "./src/routes/admin.auth.route.ts";
import { seedAdmin } from "./src/helper/seed.admin.ts";

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.json());
app.use(limit);
app.use(
  cors({
    origin: [
      "https://dravidiancampus.com",
      "https://www.dravidiancampus.com",
      "http://127.0.0.1:5500",
      "http://localhost:5500",
    ],
    credentials: true,
  }),
);

//*Routes starts here

app.use("/", emailRouter);
app.use("/admin", authRouter);
app.use("/offer", offerRouter);

await connectDb();
await seedAdmin();
app.listen(8000, async () => {
  console.log("App is running on port:8000");
});
