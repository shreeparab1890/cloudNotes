import express from "express";
const router = express.Router();
import { notes } from "../controllers/notes.js";

router.get("/", notes);

export default router;
