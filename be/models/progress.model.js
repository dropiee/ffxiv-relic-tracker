import { Schema, model } from "mongoose";
import MongooseDelete from "mongoose-delete";

const progressSchema = new Schema(
  {
    charId: {
      type: Schema.Types.ObjectId,
      ref: "Character",
      required: [true, "Character ID is required."],
    },
    relicSeries: {
      type: String,
      required: [true, "Relic series is required."],
    },
    relicJob: {
      type: String,
      required: [true, "Job is required."],
    },
    relicProgress: {
      type: Number,
      default: 0,
      required: [true, "Must be greater than or equal to 0"],
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const Progress = model("Progress", progressSchema);
export default Progress;
