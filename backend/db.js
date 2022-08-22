import mongoose from "mongoose";

//const mongoURI =
//  "mongodb+srv://cloudnotes:nZmOpzIGgBCAAGdb@cluster0.xego1lq.mongodb.net/cloud_notesDB?retryWrites=true&w=majority";

const mongoURI =
  "mongodb://localhost:27017/cloud_notesDB?retryWrites=true&w=majority";

const connecttoMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to DB successfully");
    const db_connect = "done";
    return db_connect;
  });
};

export default connecttoMongo;
