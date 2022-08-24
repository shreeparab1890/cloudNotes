import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Default",
  });

  const handleClick = (e) => {
    e.preventDefault();
    console.log(note);
    addNote(note.title, note.description, note.tag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Add a Note</h2>
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                id="description"
                name="description"
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="tag">Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag"
                id="tag"
                name="tag"
                onChange={onChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleClick}>
              Add Note
            </Button>
          </Form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default AddNote;
