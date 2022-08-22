import express from "express";
const router = express.Router();
import {
  getNotesByUser,
  notes,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.js";
import { fetchUser } from "../middleware/fetchUser.js";
import { body } from "express-validator";

router.get("/", notes);

//Get all notes by Logged In user : post('/api/notes/getNotesUser). Login required
router.get("/getNotesUser", fetchUser, getNotesByUser);

//Add notes : post('/api/notes/addNotes). Login required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a Valid Name").isLength({ min: 3 }),
    body(
      "description",
      "description Must be atleast 5 characters long"
    ).isLength({
      min: 5,
    }),
  ],
  addNote
);

//Update notes : put('/api/notes/updateNotes/:id). Login required
router.put("/updateNote/:id", fetchUser, updateNote);

//Delete notes : put('/api/notes/delete/:id). Login required
router.delete("/delete/:id", fetchUser, deleteNote);

export default router;
