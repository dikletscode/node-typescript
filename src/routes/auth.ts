import { hashing } from "../helper/hash";
import { Request as req, Response as res, Router } from "express";
import { rules, validate } from "../middleware/validation";
import { signup, login } from "../controller/auth";
import tokenVerify from "../middleware/jwtValidity";
import Jwt from "jsonwebtoken";

//instance
const route = Router();
route.post("/signup", rules(), validate, async (req: req, res: res) => {
  const { userID, username, email, password } = req.body;
  let hash: string = await hashing(password);
  try {
    let response = await signup([userID, username, email, hash]);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

route.post("/login", rules(), validate, async (req: req, res: res) => {
  const { email, password } = req.body;
  try {
    let response = await login(email, password);
    res.json(response);
  } catch (error) {
    res.status(401).json(error);
  }
});

route.get("/refreshtoken", tokenVerify, async (req: req, res: res) => {
  const { refreshToken } = req.body;
  if (!refreshToken && refreshToken.includes(refreshToken)) {
    res.json({ msg: "login again" });
  }
  try {
    Jwt.verify(
      refreshToken,
      <string>process.env.SECRET,
      (err: any, decode: any) => {
        if (err) {
          res.json({ message: "invalid" });
        } else {
          const accessToken = Jwt.sign(
            { userID: decode.userID },
            <string>process.env.NEW_SECRET,
            { expiresIn: "50s" }
          );
          res.json({ newToken: accessToken });
        }
      }
    );
  } catch (error) {}

  res.send("hello");
});

export default route;
