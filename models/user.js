import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  // 'select:false' means, that particular field will not show up in query output unless we demand it explicitly
  password: { type: String, select: false, required: true },
  createdAt: { type: Date, default: Date.now },
});

// model for user
export const User = mongoose.model("User", schema);
