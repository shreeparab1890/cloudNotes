import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6303f106557f14b1a180ce89",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 1",
      description: "hello this is an description",
      tag: "tag1",
      date: "2022-08-22T21:11:34.139Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
    {
      _id: "6304b4764a95fa42d5da49a0",
      user: "63031e30e87cddc323364f9a",
      title: "New Note 2",
      description: "hello this is an description",
      tag: "tag2",
      date: "2022-08-23T11:05:26.666Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  return (
    <noteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
