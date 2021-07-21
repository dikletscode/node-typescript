import { Request as req, Response as res, response, Router } from "express";
import { create } from "../controller/admin";
import { findRole } from "../finder/user";
import tokenVerify from "../middleware/jwtValidity";

const route = Router();

route.post("/add/:id", tokenVerify, async (req, res) => {
  const id = req.params.id;
  const result = await findRole(id);
  const { track_name, singer, album, duration, thumbnail } = req.body;
  if (result == 1) {
    try {
      let respon = await create([
        track_name,
        singer,
        album,
        duration,
        thumbnail,
      ]);
      res.json(respon);
    } catch (error) {
      console.log(error);
      res.json({ message: "Error" });
    }
  } else {
    res.json({ message: "page not found" });
  }
});
export default route;
