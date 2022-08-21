import mongoose from "mongoose";
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  password: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Notes", NotesSchema);
