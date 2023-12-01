import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";

import { db } from "../../config/db.js";
import { verifyToken } from "../middleware/auth.js";
import { get_info, upd_info, del_info } from "../models/userModel.js";
import {
  updateValidation,
  deleteValidation,
} from "../validations/userValidation.js";

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
  const { name, email, password } = req.body;

  try {
    //

    await db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, data) => {
        if (err) console.log("ERROR" + err);

        if (data.length) {
          return res.json("This email is already in use");
        }
        // bcrypted password
        const bycrptedPassword = await bcrypt.hash(password, 8);

        db.query(
          "INSERT INTO users(name, email, password)  VALUES (?,?,?)",
          [name, email, bycrptedPassword],
          (err, data) => {
            if (err) {
              console.log("error" + err);
            } else {
              return res.json({
                code: 200,
                message: "User is registered succesfully",
              });
            }
          }
        );
      }
    );
  } catch (err) {
    throw err;
  }

  //
});

// ****************************************************
// logIn end point
// ****************************************************
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // fetch data from database
    await db.query(
      "SELECT name, email, password FROM users",
      async (err, data) => {
        if (err) throw err;

        const verifyPassword = await bcrypt.compare(password, data[0].password);

        // console.log(email, data, verifyPassword);

        if (email == data[0].email && verifyPassword) {
          //

          // define refresh token
          const refreshToken = jwt.sign(
            {
              user: data[0].name,
            },
            process.env.REFRESH_TOKEN,
            {
              expiresIn: "30d",
            }
          );

          // define access token
          const accessToken = jwt.sign(
            {
              user: data[0].name,
            },
            process.env.ACCESS_TOKEN,
            {
              expiresIn: "1d",
            }
          );

          return res.status(200).json({
            code: 200,
            refreshToken: refreshToken,
            accessToken: accessToken,
          });

          //
        } //
        else {
          return res.status(401).json({
            code: 401,
            message: "Bad Credentials",
          });
        }
      }
    );
  } catch (err) {
    throw err;
  }

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
router.get("/users/:id", verifyToken, get_info);

router.put("/users/:id", verifyToken, updateValidation, upd_info);

router.delete("/users/:id", verifyToken, deleteValidation, del_info);

export default router;
