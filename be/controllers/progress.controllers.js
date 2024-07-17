import Progress from "../models/progress.model.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

import jobs from "../data/jobs.json" with {type: "json"};
import series from "../data/series.json" with {type: "json"};

const createProgressSeries = asyncHandler(async (req, res) => {
  const { charId } = req.body;

  const newProgress = [];

  // Only the charId is provided from the frontend. data for relicSeries and relicJob is retrieved from series.json and job.json.
  try {
    series.forEach((element) => {
      if (element === "Zodiac") {
        for (let j = 0; j < 10; j++) {
          newProgress.push({
            insertOne: {
              document: {
                charId,
                relicSeries: element,
                relicJob: jobs[j].job,
              },
            },
          });
        }
      }
    });
    await Progress.bulkWrite(newProgress);
    res.status(201).send({
      message: `Progress for character with ID ${charId} has been created.`,
      data: newProgress,
    });
  } catch {
    res.status(500);
    throw new Error(
      "Something went wrong while creating the character's progress."
    );
  }
});

const getProgressByCharId = asyncHandler(async (req, res) => {
  const { charId } = req.params;

  const progress = await Progress.find({ charId });

  if (!progress) {
    res.status(404);
    throw new Error("Progress not found");
  } else {
    res.status(200).send({
      message: `Progress for all relics of character with ID ${charId} retrieved.`,
      data: progress,
    });
  }
});

const getProgressById = asyncHandler(async (req, res) => {
  const { progressId } = req.params;

  const progress = await Progress.find({ progressId });

  if (!progress) {
    res.status(404);
    throw new Error("Progress not found");
  } else {
    res.status(200).send({
      message: `Progress with ID ${progressId} retrieved.`,
      data: progress,
    });
  }
});

const updateProgress = asyncHandler(async (req, res) => {
  const { relicProgress } = req.body;
  const { progressId } = req.params;

  try {
    const updatedRelicProgress = await Progress.findOneAndUpdate(
      { _id: progressId },
      { relicProgress },
      {new: true}
    );

    res.status(200).send({
      message: "Progress has been updated.",
      data: updatedRelicProgress,
    });
  } catch {
    res.status(500);
    throw new Error(
      "Something went wrong while updating the character's progress."
    );
  }
});

export {
  createProgressSeries,
  getProgressByCharId,
  getProgressById,
  updateProgress,
};
