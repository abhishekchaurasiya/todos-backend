import { model, Schema } from "mongoose";
import { CollectionNames } from "../utils/utilityVariables.js";

const subtodosSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Sub-task title is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    todo: {
      type: Schema.Types.ObjectId,
      ref: CollectionNames.Todo,
      required: true,
    },
  },
  { timestamps: true, _id: false }
);

const SubToDoModel = model(CollectionNames.SubToDo, subtodosSchema);
export default SubToDoModel;