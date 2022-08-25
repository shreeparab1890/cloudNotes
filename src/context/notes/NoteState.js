import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bmF5YW5hQGdtYWlsLmNvbSIsImlkIjoiNjMwMzFlMzBlODdjZGRjMzIzMzY0ZjlhIiwiaWF0IjoxNjYxNDQyMzYzLCJleHAiOjE2NjE0NDU5NjN9.QSf0UID2Cmlcu6RERpEe3rGP6-YF3uP2hpWCjJwtfpg";

  const getNotes = async () => {
    let response = await fetch(`${host}/api/notes/getNotesUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token,
      },
    });
    const output = await response.json();
    setNotes(output.notes);
  };

  const addNote = async (title, description, tag) => {
    let response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const output = await response.json();
    setNotes(notes.concat(output.result));
  };

  const deleteNote = async (id) => {
    let response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token,
      },
    });
    const output = await response.json();
    setNotes(output.notes);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const updateNote = async (id, title, description, tag) => {
    //API Call
    let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const output = response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to update

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, updateNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
