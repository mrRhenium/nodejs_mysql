import { check, validationResult } from "express-validator";
import { get_user_by_email, get_user_by_id } from "../models/userModel.mjs";

export const updateValidation = [
  check("id").custom(async (value, { req }) => {
    return get_user_by_id(req.params.id).then((user) => {
      // console.log(user);
      if (user[0]) return Promise.reject("User is not exist");
    });
  }),
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name should not be empty")
    .isLength({ min: 1, max: 20 }),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("E-mail is required")
    .isEmail()
    .withMessage("Please enter valid E-mail")
    .custom(async (value) => {
      return get_user_by_email(value).then((user) => {
        // console.log(user);
        if (user) return Promise.reject("Email is already in use");
      });
    }),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 6, max: 20 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errors_array = errors.array();
      return res.status(422).json({ errors: errors_array[0] });
    } else next();
  },
];

export const deleteValidation = [
  check("id").custom(async (value, { req }) => {
    return get_user_by_id(req.params.id).then((user) => {
      if (user[0]) return Promise.reject("User is not exist");
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errors_array = errors.array();
      return res.status(422).json({ errors: errors_array[0] });
    } else next();
  },
];
