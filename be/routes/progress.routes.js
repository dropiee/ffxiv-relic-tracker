import { Router } from "express";
import {
  createProgressSeries,
  getProgressByCharId,
  getProgressById,
  updateProgress,
} from "../controllers/progress.controllers.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const progressRouter = Router();

progressRouter.post("/", verifyAccessToken, createProgressSeries);
progressRouter.get("/by_character/:charId", getProgressByCharId);
progressRouter.get("/:progressId", getProgressById);
progressRouter.patch("/:progressId/update", updateProgress);

export default progressRouter;
