import express from "express";
const router = express.Router();
import { createuser, login, getUser } from "../controllers/auth.js";
import { body } from "express-validator";
import { fetchUser } from "../middleware/fetchUser.js";

//Create a user: post('/api/auth/createuser). Login not required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password Must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  createuser
);

//Login a user: post('/api/auth/login). Login not required
router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password be blacked").exists(),
  ],
  login
);

//Get Logged In user : post('/api/auth/getUser). Login required
router.post("/getUser", fetchUser, getUser);

export default router;
