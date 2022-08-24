import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    let response = await fetch(`${host}/api/notes/getNotesUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bmF5YW5hQGdtYWlsLmNvbSIsImlkIjoiNjMwMzFlMzBlODdjZGRjMzIzMzY0ZjlhIiwiaWF0IjoxNjYxMzI4MDczLCJleHAiOjE2NjEzMzE2NzN9.MAWtuY7FgSa73Shw1Si1fOz-ePQfpfDeqW40UGHCvw4",
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
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bmF5YW5hQGdtYWlsLmNvbSIsImlkIjoiNjMwMzFlMzBlODdjZGRjMzIzMzY0ZjlhIiwiaWF0IjoxNjYxMzI5MjY5LCJleHAiOjE2NjEzMzI4Njl9.nGxHRl2kGKSwDCnlJJ6nIELCu7e9pEhFDQnzDKtYaTE",
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
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bmF5YW5hQGdtYWlsLmNvbSIsImlkIjoiNjMwMzFlMzBlODdjZGRjMzIzMzY0ZjlhIiwiaWF0IjoxNjYxMzI4MDczLCJleHAiOjE2NjEzMzE2NzN9.MAWtuY7FgSa73Shw1Si1fOz-ePQfpfDeqW40UGHCvw4",
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
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bmF5YW5hQGdtYWlsLmNvbSIsImlkIjoiNjMwMzFlMzBlODdjZGRjMzIzMzY0ZjlhIiwiaWF0IjoxNjYxMjA0OTkxLCJleHAiOjE2NjEyMDg1OTF9.MIeOa-OaqiU7XHBi4Ji3UhAiNigJSSKbp7bbJn-Ceoo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const output = response.json();
    console.log(output);

    //Logic to update
    console.log("updating the note with id: " + id);
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
