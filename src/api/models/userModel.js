import { db } from "../../config/db.js";

export const get_info = async (req, res, next) => {
  //
  await db.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err) throw err;

      return res.status(200).json({
        code: 200,
        data: data,
      });
    }
  );

  //
};

export const upd_info = async (req, res, next) => {
  //

  await db.query(
    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? ",
    [req.body.name, req.body.email, req.body.password, req.params.id],
    (err, data) => {
      if (err) throw err;

      return res.json({
        code: 200,
        data: data,
      });
    }
  );

  //
};

export const del_info = async (req, res, next) => {
  //

  await db.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (err, data) => {
      if (err) throw err;

      return res.json({
        code: 200,
        data: data,
      });
    }
  );

  //
};

export const get_user_by_email = async (email) => {
  //
  await db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, data) => {
      if (err) throw err;

      return data;
    }
  );

  //
};

export const get_user_by_id = async (id) => {
  //
  // let message = "Something went wrong",
  //   code = 500,
  //   data = [];

  const response = await db.query("SELECT * FROM users WHERE id = ?", [id]);

  // message = "No Data Found";
  // code = 400;
  // data = [];

  // if (response.length) {
  //   return res.json({
  //     message: "User fetched Successfully",
  //     code: 200,
  //     data: response,
  //   });
  // }

  return response;
  //
};
