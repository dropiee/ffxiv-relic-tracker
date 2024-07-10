import { Schema, model, mongo } from "mongoose";
import MongooseDelete from "mongoose-delete";

const charSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    charName: {
      type: String,
      required: [true, "Name field is required"],
    },
    charWorld: {
      type: String,
      required: [true, "Name field is required"],
    },
  },
  {
    timestamps: true,
  }
);

charSchema.plugin(MongooseDelete, { overrideMethods: "all" });

const Character = model("Character", charSchema);
export default Character;
