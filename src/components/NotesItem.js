import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const NotesItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <Card className="my-3">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotesItem;
