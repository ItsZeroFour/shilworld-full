import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default: "/uploads/AvatarPlaceholder.webp",
    },

    nickname: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      default: "User",
    },

    emailIsVerified: {
      type: Boolean,
      default: false,
    },

    TwoFA: {
      type: Boolean,
      default: false,
    },

    rub: {
      type: Number,
      default: 0,
    },

    euro: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
