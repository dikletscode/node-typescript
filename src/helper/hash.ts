import bcrypt from "bcrypt";
import { NextFunction } from "express";

export const hashing = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

export const compare = (password: string, hash: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, response) => {
      if (err) console.log(err);
      if (response) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  });
};
