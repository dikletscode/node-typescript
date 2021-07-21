export const userQuery = `INSERT INTO tb_users
(userID,username,email,pass_word) 
VALUES(?,?,?,?) `;

export const loginQuery = (email: string) => {
  return `SELECT * FROM tb_users 
WHERE email="${email}" `;
};
