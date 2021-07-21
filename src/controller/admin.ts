import sql from "../../db/sql";
import { insertMusicQuery } from "../query/music";

export const create = (arr: string[]) => {
  return new Promise((resolve, reject) => {
    sql.query(insertMusicQuery, arr, (err) => {
      if (err) reject(err);
      resolve({ mesage: "added succesfully" });
    });
  });
};
