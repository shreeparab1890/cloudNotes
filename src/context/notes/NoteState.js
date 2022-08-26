import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_HOST;
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // getNotes of the loggedin user on home page
  const getNotes = async () => {
    if (!localStorage.getItem("token")) {
      const emptyArray = [];
      setNotes(emptyArray);
    } else {
      let response = await fetch(`${host}/api/notes/getNotesUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          token: localStorage.getItem("token"),
        },
      });
      const output = await response.json();
      setNotes(output.notes);
    }
  };

  // add a note
  const addNote = async (title, description, tag) => {
    let response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const output = await response.json();
    setNotes(notes.concat(output.result));
  };

  //delete a note
  const deleteNote = async (id) => {
    let response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: localStorage.getItem("token"),
      },
    });
    const output = await response.json();
    setNotes(output.notes);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //update a note
  const updateNote = async (id, title, description, tag) => {
    let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const output = response.json();
    console.log(output);

    let newNotes = JSON.parse(JSON.stringify(notes));
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
