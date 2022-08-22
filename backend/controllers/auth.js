import userModel from "../models/user.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "cloud_notes_scret";

//Create a user: post('/api/auth/createuser). Login not required
export const createuser = async (req, res) => {
  const errors = validationResult(req);
  //return is bad request due to validation
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Bad Request" });
  }

  const { name, email, password } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });
    //check if the user with the email exists
    if (oldUser) {
      return res
        .status(200)
        .json({ message: "User with the same Email id already Exists." });
    } else {
      const salt = await bcrypt.genSalt(10); //create salt
      const hashPassword = await bcrypt.hash(password, salt); //cretae hash using salt and password
      const user = await userModel.create({
        name,
        email,
        password: hashPassword, //store hash in the db
      });

      //generate jwt token
      const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
        expiresIn: "1hr",
      });

      return res
        .status(200)
        .json({ result: user, token, message: "User added successfully" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

//Login a user: post('/api/auth/login). Login not required
export const login = async (req, res) => {
  const errors = validationResult(req);
  //return is bad request due to validation
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), message: "Bad Request" });
  }

  const { email, password } = req.body;
  try {
    const oldUser = await userModel.findOne({ email });

    if (!oldUser) {
      return res.status(404).json({ message: "User Not Found, Please Signup" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Incorrect Password" });
    }

    //generate jwt token
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );

    return res
      .status(200)
      .json({ token, message: "User LoggedIn successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

//Get Logged In user : post('/api/auth/getUser). Login required
export const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await userModel.findOne({ _id: id }).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};
