import React, { useContext } from "react";
//import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import noteContext from "../context/notes/noteContext";

const NotesItem = (props) => {
  const { note, updatenote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <Card className="my-3">
        <Card.Body>
          <div className="d-flex align-item-center">
            <Card.Title>{note.title}</Card.Title>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>

          <Card.Text>{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotesItem;
