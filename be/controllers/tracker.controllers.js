import Tracker from "../models/tracker.model.js";
import { asyncHandler } from "../middlewares/error.middleware.js";

import zodiacSteps from "../data/zodiac/zodiacSteps.json" with { type: "json" };
import zodiacQuests from "../data/zodiac/zodiacQuests.json" with { type: "json" };

const createTracker = asyncHandler(async (req, res) => {
  const { charId, trackerSeries, trackerJob } = req.body;

  const newSteps = [];

  // Steps and quest data are retrieved from zodiacSteps.json and zodiacQuests.json
  for (let i = 0; i < 8; i++) {
    newSteps.push({
      stage: zodiacQuests[i].stage,
      title: zodiacQuests[i].title,
      questLocation: zodiacQuests[i].location,
      reqItems: zodiacQuests[i].reqItems,
      quest: zodiacSteps[i],
    });
  }

  try {
    const newTracker = new Tracker({
      charId,
      trackerSeries,
      trackerJob,
      steps: newSteps
    });
    await newTracker.save();

    res.status(200).send({
      message: `Tracker successfully created.`,
      data: newTracker,
    });
  } catch (err) {
    res.status(400);
    throw new Error("Something went wrong while creating a new tracker.");
  }
});

const getAllTrackers = asyncHandler(async (req, res) => {
  const { charId } = req.params;
  const allTrackers = await Tracker.find({ charId }).sort({ _id: -1 });

  if (!allTrackers) {
    res.status(404);
    throw new Error("No trackers found.");
  } else {
    res.status(200).send({
      message: `Trackers for character with ID ${charId} retrieved`,
      data: allTrackers,
    });
  }
});

const getTrackerById = asyncHandler(async (req, res) => {
  const { trackerId } = req.params;
  const allTrackers = await Tracker.find({ trackerId }).sort({ _id: -1 });

  if (!allTrackers) {
    res.status(404);
    throw new Error("No tracker found.");
  } else {
    res.status(200).send({
      message: `Tracker with ID ${trackerId} retrieved`,
      data: allTrackers,
    });
  }
});

const deleteTracker = asyncHandler(async (req, res) => {
  const { trackerId } = req.params;

  // Mongoose-delete module is used to handle soft deletion
  try {
    const deletedTracker = await Tracker.delete({ _id: trackerId });
    res.status(204).send({
      message: `Tracker ID ${trackerId} and its steps have been deleted.`,
    });
  } catch (err) {
    res.status(500);
    console.log(err);
    throw new Error("Something went wrong while deleting the tracker");
  }
});

export { createTracker, getAllTrackers, getTrackerById, deleteTracker };
