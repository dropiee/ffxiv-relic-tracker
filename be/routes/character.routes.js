import { Router } from "express";
import {
  createCharacter,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} from "../controllers/character.controllers.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const charRouter = Router();

charRouter.post("/", verifyAccessToken, createCharacter);
charRouter.get("/:charId", getCharacterById);
charRouter.patch("/:charId", verifyAccessToken, updateCharacter);
charRouter.delete("/:charId", verifyAccessToken, deleteCharacter);

export default charRouter;
