import { Router } from "express";
import { signup, signin } from "../controllers/user.controllers.js";
import { getUserCharacters } from "../controllers/character.controllers.js";

const userRouter = Router();

userRouter.post("/register", signup);
userRouter.post("/login", signin);
userRouter.get("/:userId", getUserCharacters);

export default userRouter;
