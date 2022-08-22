import jwt from "jsonwebtoken";
const JWT_SECRET = "cloud_notes_scret";

export const fetchUser = (req, res, next) => {
  //fetch user from jwt token and add id to req
  const token = req.header("token");
  if (!token) {
    res.status(401).send("Please authenticate with valid token");
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data;
    console.log(data);
    next();
  } catch (error) {
    res.status(401).json("Please authenticate with valid token");
  }
};
