import { model, Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const UserModel = model("User", UserSchema);
export default UserModel;
