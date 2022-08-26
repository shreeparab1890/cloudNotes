import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, updateNote } = context;
  const navigate = useNavigate();

  const { showAlert } = props;

  const [show, setShow] = useState(false);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "Default",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const ref = useRef(null);
  const refclose = useRef(null);

  const handleClick = (e) => {
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note Updated Successfully.", "success");
    refclose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={showAlert} />
      <Button
        ref={ref}
        className="d-none"
        variant="primary"
        onClick={handleShow}
      >
        update modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control
                id="etitle"
                name="etitle"
                type="text"
                placeholder="Enter title"
                onChange={onChange}
                value={note.etitle}
                minLength={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                id="edescription"
                name="edescription"
                onChange={onChange}
                value={note.edescription}
                minLength={5}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="tag">Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tag"
                id="etag"
                name="etag"
                onChange={onChange}
                value={note.etag}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refclose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={handleClick}
            variant="primary"
            disabled={note.etitle.length < 5 || note.edescription.length < 5}
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row my-3">
        <h2>Your Note:</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes?.map((note) => {
          return (
            <NotesItem updatenote={update} note={note} showAlert={showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
