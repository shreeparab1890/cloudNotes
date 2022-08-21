import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, required: false, default: Date.now },
});

//module.exports = mongoose.model("User", UserSchema);
//const user = mongoose.model("User", UserSchema);
//user.createIndexes();
export default mongoose.model("User", UserSchema);
