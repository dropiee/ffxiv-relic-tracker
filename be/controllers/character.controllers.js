import Character from "../models/character.model.js";
import Progress from "../models/progress.model.js";
import Tracker from "../models/tracker.model.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

const createCharacter = asyncHandler(async (req, res) => {
  const { userId, charName, charWorld } = req.body;

  const isCharExist = await Character.findOne({ charName, charWorld });

  if (isCharExist) {
    res.status(400);
    throw new Error("Character with the same name and world already exists.");
  } else {
    const newChar = new Character({
      userId,
      charName,
      charWorld,
    });
    await newChar.save();

    res.status(201).send({
      message: "Character has been created.",
      data: newChar,
    });
  }
});

const getUserCharacters = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  // Optional query parameters
  const query = req.query;
  let field = "charName";
  let sort = 1;

  if (Object.keys(query).length) {
    for (let key in query) {
      if (key == "field") {
        field = query[key] === "world" ? "charWorld" : "charName";
      }
      if (key == "sort") {
        sort = query[key] === "desc" ? -1 : 1;
      }
    }
  }

  const characters = await Character.find({ userId }).sort({ [field]: sort });
  if (!characters) {
    res.status(404);
    throw new Error("Character not found.");
  } else {
    res.status(200).send({
      message: `List of characters of user ID ${userId} retrieved.`,
      data: characters,
    });
  }
});

const getCharacterById = asyncHandler(async (req, res) => {
  const { charId } = req.params;

  const charById = await Character.findOne({ _id: charId });

  if (!charById) {
    res.status(404);
    throw new Error("Character not found.");
  } else {
    res.status(200).send({
      message: `Character with ID ${charId} retrieved.`,
      data: charById,
    });
  }
});

const updateCharacter = asyncHandler(async (req, res) => {
  const { charId } = req.params;
  const { charName, charWorld } = req.body;

  const charById = await Character.findById(charId);
  const isCharExist = await Character.findOne({ charName, charWorld });

  if (!charById) {
    res.status(404);
    throw new Error("Character not found.");
  }
  if (isCharExist) {
    res.status(400);
    throw new Error("Character with the same name and world already exists.");
  }

  charById.charName = charName || charById.charName;
  charById.charWorld = charWorld || charById.charWorld;

  const updatedChar = await charById.save();

  res.status(200).send({
    message: "Character has been updated.",
    data: updatedChar,
  });
});

const deleteCharacter = asyncHandler(async (req, res) => {
  const { charId } = req.params;

  // Mongoose-delete module is used to handle soft deletion
  try {
    const deletedChar = await Character.delete({ _id: charId });
    const deletedProgress = await Progress.delete({ charId });
    const deletedTracker = await Tracker.delete({ charId });
    res.status(204).send({
      message:
        "Character and associated progress and trackers have been deleted.",
    });
  } catch (err) {
    res.status(500);
    console.log(err);
    throw new Error("Something went wrong while deleting the character");
  }
});

export {
  createCharacter,
  getUserCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
