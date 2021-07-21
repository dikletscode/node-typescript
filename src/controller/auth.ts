import { loginQuery, userQuery } from "../query/user";
import sql from "../../db/sql";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "../../messages/auth";
import { compare } from "../helper/hash";
import { refreshToken, signToken } from "../helper/token";

export const signup = (data: string[]) => {
  return new Promise((resolve, reject) => {
    sql.query(userQuery, data, (err) => {
      if (!err) {
        resolve(SIGNUP_SUCCESS());
      } else {
        reject(SIGNUP_FAIL(err));
      }
    });
  });
};

export const login = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    sql.query(loginQuery(email), async (err, data) => {
      if (err) console.log(err.message);
      if (!!data.length) {
        try {
          let isLogin = await compare(password, data[0].pass_word);
          const token = await signToken(data[0].userID);
          const refresh = await refreshToken(data[0].userID);
          if (isLogin) resolve(LOGIN_SUCCESS(token, refresh, data));
        } catch (error) {
          console.log(error);
          reject(LOGIN_FAIL());
        }
      } else {
        reject({ msg: "account not registered" });
      }
    });
  });
};
