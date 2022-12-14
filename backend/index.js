import express from "express";
import connecttoMongo from "./db.js";
import authRouter from "./routes/auth.js";
import notesRouter from "./routes/notes.js";
import cors from "cors";

const db_connect = connecttoMongo();
const app = express();
const port = 5000;
app.use(express.json({ limit: "30mb", extended: true }));
//Routes
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Wecome to CloudNotes APIs");
});

app.listen(port, () => {
  console.log(`CloudNotes listening on port ${port}`);
  if (!db_connect) {
    console.log("Waiting for DB to connect");
  }
});
