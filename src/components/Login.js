import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCred] = useState({ email: "", password: "" });
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const { showAlert } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("login click");
    let response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const output = await response.json();
    console.log(output.token);
    if (output.token) {
      //alert("Login Successfull");
      showAlert(output.message, "success");
      localStorage.setItem("token", output.token);
      navigate("/");
    } else {
      alert("Login Invalid ");
      showAlert(output.message, "danger");
      setCred({ email: "", password: "" });
    }
  };

  const onChange = (e) => {
    setCred({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 style={{ textAlign: "center" }}> LOGIN </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Login;
