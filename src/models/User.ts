import { IUser, ROLE } from "@/types/User";
import { Model, model, models, Schema } from "mongoose";

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(ROLE),
      default: ROLE.USER,
    },
  },
  { timestamps: true }
);

export default (models.User as Model<IUser>) ||
  model<IUser>("User", UserSchema);
