
import mongoose from "mongoose";
import { CollectionNames } from "../utils/utilityVariables.js";

const { Schema, model } = mongoose;

// Define the ToDo schema
const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    subtodos: [
      {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.SubToDo,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: CollectionNames.User,
      required: true,
    },
  },
  {
    timestamps: true,
    _id:false
  }
);

// Create and export the ToDo model
const ToDoModel = model(CollectionNames.Todo, todoSchema);

export default ToDoModel;