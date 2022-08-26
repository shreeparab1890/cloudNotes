import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const host = process.env.REACT_APP_HOST;
  const navigate = useNavigate();
  const { showAlert } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password === user.cpassword) {
      let response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });
      const output = await response.json();
      console.log(output);

      if (output.token) {
        //alert(output.message);
        showAlert(output.message, "success");
        //localStorage.setItem("token", output.token);
        navigate("/login");
      } else {
        //alert("Signup Invalid ");
        showAlert(output.message, "danger");
        setUser({ name: "", email: "", password: "", cpassword: "" });
      }
    } else {
      //alert("Password Does Not Match. ");
      showAlert("Password Does Not Match.", "danger");
      setUser({ name: "", email: "", password: "", cpassword: "" });
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <h1 style={{ textAlign: "center" }}> SIGNUP </h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                id="name"
                name="name"
                value={user.name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                id="email"
                name="email"
                value={user.email}
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
                value={user.password}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                id="cpassword"
                name="cpassword"
                value={user.cpassword}
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

export default Signup;
