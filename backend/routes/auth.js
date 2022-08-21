import express from "express";
const router = express.Router();
import { createuser } from "../controllers/auth.js";
import { body } from "express-validator";

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

export default router;
