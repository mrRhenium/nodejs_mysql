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
