import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import MongooseDelete from "mongoose-delete";
import db from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import charRouter from "./routes/character.routes.js";
import progressRouter from "./routes/progress.routes.js";
import trackerRouter from "./routes/tracker.routes.js";
import { errorHandler, pageNotFound } from "./middlewares/error.middleware.js";

mongoose.plugin(MongooseDelete);

dotenv.config();

app.use(
  cors({
    origin: [
      "https://ffxiv-relic-tracker-br3r2sr2n-drops-projects-df7257b8.vercel.app",
    ],
    credentials: true,
  })
);
const baseURL = "/api/v1";

db();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(`${baseURL}/users`, userRouter);
app.use(`${baseURL}/characters`, charRouter);
app.use(`${baseURL}/progress`, progressRouter);
app.use(`${baseURL}/trackers`, trackerRouter);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
