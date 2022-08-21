import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://cloudnotes:nZmOpzIGgBCAAGdb@cluster0.xego1lq.mongodb.net/cloud_notesDB?retryWrites=true&w=majority";

const connecttoMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to MongoDB successfully");
  });
};

export default connecttoMongo;
