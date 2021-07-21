import { NextFunction as next, Request as req, Response as res } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

const tokenVerify = (req: req, res: res, next: next) => {
  const headers = req.headers;

  const auth = headers.authorization;

  if (auth) {
    const token = auth && auth.split(" ")[1]; //separate bearer token
    jwt.verify(token, <string>process.env.SECRET, (err) => {
      if (err) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      return next();
    });
  } else {
    res.status(401).json({ msg: "u can't access,not authenticated" });
  }
};

export default tokenVerify;
