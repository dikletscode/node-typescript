import { MysqlError } from "mysql";

export const SIGNUP_SUCCESS = (): object => {
  return { message: "account created successfully" };
};

export const LOGIN_SUCCESS = (
  token: string,
  refreshToken: string,
  data: string[]
): object => {
  return {
    isLogin: true,
    token: token,
    refreshToken: refreshToken,
    data: data,
  };
};

export const LOGIN_FAIL = (): object => {
  return { message: "email,password,or combination is invalid" };
};

export const SIGNUP_FAIL = (err: MysqlError): object => {
  let field = err.sqlMessage;
  let message = "";
  if (err.code == "ER_DUP_ENTRY") {
    if (field?.includes("email")) {
      message = "email has been used";
    } else if (field?.includes("username")) {
      message = "username has been used";
    } else {
      message = "Failed to create account";
    }
  }
  return { message: message };
};
