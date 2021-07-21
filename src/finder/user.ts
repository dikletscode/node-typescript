import sql from "../../db/sql";

export const findRole = (id: string) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT roleID FROM tb_users where userID="${id}"`,
      (err, rows): any => {
        if (err) {
          reject(err);
        }
        resolve(rows[0].roleID);
      }
    );
  });
};
