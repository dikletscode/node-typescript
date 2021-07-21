import { sign } from "jsonwebtoken";
require("dotenv").config();

export const signToken = async (userID: string) => {
  return sign({ userID: userID }, <string>process.env.SECRET, {
    expiresIn: "15m",
  });
};

export const refreshToken = async (userID: string) => {
  return sign({ userID }, <string>process.env.NEW_SECRET, {
    expiresIn: "7h",
  });
};
