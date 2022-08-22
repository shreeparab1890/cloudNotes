import notesModel from "../models/Notes.js";
import { validationResult } from "express-validator";

export const notes = (req, res) => {
  const obj1 = {
    a: "Amay",
    number: 20,
  };
  res.json(obj1);
};

//Get all notes by Logged In user : get('/api/notes/getNotesUser). Login required
export const getNotesByUser = async (req, res) => {
  try {
    const id = req.user.id;
    const notes = await notesModel.find({ id });
    return res.status(200).json({ notes });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

//Add notes : post('/api/notes/addNote). Login required
export const addNote = async (req, res) => {
  const errors = validationResult(req);
  //return is bad request due to validation
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Bad Request" });
  }
  const id = req.user.id;
  const { title, description, tag } = req.body;
  try {
    const notes = await notesModel.create({
      title,
      description,
      tag,
      user: id,
    });

    const newNote = await notes.save();

    return res
      .status(200)
      .json({ result: newNote, message: "Note added successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

//Update notes : put('/api/notes/updateNotes/:id). Login required
export const updateNote = async (req, res) => {
  const Userid = req.user.id;
  const Noteid = req.params.id;
  const { title, description, tag } = req.body;
  try {
    const newNotes = {};
    //check if user has sent title to update
    if (title) {
      newNotes.title = title; //if yes, update title
    }

    //check if user has sent description to update
    if (description) {
      newNotes.description = description; //if yes, update description
    }

    //check if user has sent tag to update
    if (tag) {
      newNotes.tag = tag; // if yes, update tag
    }

    //Find the note to update
    let note = await notesModel.findById({ _id: Noteid });
    if (!note) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    //check if user owns the note to update
    if (note.user.toString() !== Userid) {
      return res.status(401).json({ message: "Note Allowed" });
    }

    note = await notesModel.findByIdAndUpdate(
      Noteid,
      { $set: newNotes },
      { new: true }
    );

    return res
      .status(200)
      .json({ result: note, message: "Note Updated successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

//Delete notes : delete('/api/notes/delete/:id). Login required
export const deleteNote = async (req, res) => {
  const Userid = req.user.id;
  const Noteid = req.params.id;

  try {
    //Find the note to delete
    let note = await notesModel.findById({ _id: Noteid });
    if (!note) {
      return res.status(404).json({ message: "Note Not Found" });
    }

    //check if user owns the note to delete
    if (note.user.toString() !== Userid) {
      return res.status(401).json({ message: "Note Allowed" });
    }

    note = await notesModel.findByIdAndDelete(Noteid);

    return res
      .status(200)
      .json({ result: note, message: "Note Deleted successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};
