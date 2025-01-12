import { model, Schema } from "mongoose";
import { CollectionNames } from "../utils/utilityVariables.js";

/// user modle
const userShemaa = new Schema(
  {
    user_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: CollectionNames.Todo,
      },
    ],
  },
  { timestamps: true }
);

const UserModel = model(CollectionNames.User, userShemaa);
export default UserModel;

