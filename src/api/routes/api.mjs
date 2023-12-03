import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";

import { query } from "../../config/db.mjs";
import {
  updateValidation,
  deleteValidation,
} from "../validations/userValidation.mjs";

import { verifyToken } from "../middleware/auth.mjs";
import { del_user, get_user, upd_user } from "../controller/userControler.mjs";

const router = express.Router();

// ****************************************************
// home page end point
// ****************************************************
router.get("/", (req, res) => {
  return res.json({
    status: 200,
    msg: "success",
  });
});

// ****************************************************
// Register end point
// ****************************************************
router.post("/register", updateValidation, async (req, res) => {
  const { id, name, email, password } = req.body;

  let message = "Something went wrong",
    code = 500,
    data = [];

  try {
    //

    const user = await query("SELECT email FROM users WHERE email = ?", [
      email,
    ]);

    // console.log(user.length);

    if (user.length) {
      message = "Email is already exist";
      code = 403;
      data = user;
    } else {
      const bycrptedPassword = await bcrypt.hash(password, 8);

      const data = await query(
        "INSERT INTO users(id, name, email, password) VALUES (?,?,?,?)",
        [id, name, email, bycrptedPassword]
      );

      message = "User is registered successfully!";
      code = 200;
      data = data;
    }
  } catch (err) {
    message = err;
  }

  return res.status(code).json({
    message,
    code,
    data,
  });

  //
});

// ****************************************************
// logIn end point
// ****************************************************
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let message = "Something went wrong!",
    code = 500,
    data = [];

  try {
    // fetch data from database
    const response = await query(
      "SELECT name, email, password FROM users WHERE email = ?",
      [email]
    );

    message = "Bad Credentials!";
    code = 403;
    data = [];

    if (response.length > 0) {
      const verifyPassword = await bcrypt.compare(
        password,
        response[0].password
      );

      // console.log(email, data, verifyPassword);

      if (email == response[0].email && verifyPassword) {
        //

        // define refresh token
        const refreshToken = jwt.sign(
          {
            user: response[0].name,
          },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "30d",
          }
        );

        // define access token
        const accessToken = jwt.sign(
          {
            user: response.name,
          },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "1d",
          }
        );

        message = "Successfully LogedIn";
        code = 200;
        data = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };

        //
      } //
    }

    //
  } catch (err) {
    throw err;
  }

  return res.status(code).json({ message, code, data });
  //
});

// ****************************************************
// profile end point
// ****************************************************
router.get("/profile", verifyToken, async (req, res) => {
  try {
    //
    //
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// ****************************************************
// users end point
// ****************************************************
router.get("/users/:id", verifyToken, get_user);

router.put("/users/:id", verifyToken, updateValidation, upd_user);

router.delete("/users/:id", verifyToken, deleteValidation, del_user);

export default router;
