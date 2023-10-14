import mongoose from "mongoose";

const CodeSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
    unique: true,
  },

  code: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Code", CodeSchema);
