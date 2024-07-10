import { Router } from "express";
import {
  createTracker,
  getAllTrackers,
  getTrackerById,
  deleteTracker,
} from "../controllers/tracker.controllers.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const trackerRouter = Router();

trackerRouter.post("/", verifyAccessToken, createTracker);
trackerRouter.get("/by_character/:charId", getAllTrackers);
trackerRouter.get("/:trackerId", getTrackerById);
trackerRouter.delete("/:trackerId/", verifyAccessToken, deleteTracker);

export default trackerRouter;
