import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Notes from "./Notes";

const Home = () => {
  return (
    <div>
      <div className="container">
        <h2 style={{ textAlign: "center" }}>Add a Note</h2>
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
          <div className="col-md-4"></div>
        </div>
        <Notes />
      </div>
    </div>
  );
};

export default Home;
