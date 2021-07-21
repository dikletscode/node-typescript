import express from "express";
import auth from "./routes/auth";
import admin from "./routes/admin";
import cookieParser from "cookie-parser";
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/", auth);
app.use("/private", admin);

app.listen("8080", () => {
  console.log("http://localhost:8080");
});
