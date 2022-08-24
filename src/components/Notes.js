import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2>Your Note:</h2>
        {notes?.map((note) => {
          return <NotesItem note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
