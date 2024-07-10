import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

const trackerSchema = new Schema(
  {
    charId: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      required: [true, "Character ID is required."],
    },
    trackerSeries: {
      type: String,
      required: [true, "A relic series must be chosen"],
    },
    trackerJob: {
      type: String,
      required: [true, "A Job must be chosen"],
    },
    steps: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

trackerSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const Tracker = model("Tracker", trackerSchema);
export default Tracker;
