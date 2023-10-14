import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },

  token: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Token", TokenSchema);
