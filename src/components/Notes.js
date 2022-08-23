import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-3">
      <h2>Your Note:</h2>
      {notes.map((note) => {
        return <NotesItem note={note} />;
      })}
    </div>
  );
};

export default Notes;
