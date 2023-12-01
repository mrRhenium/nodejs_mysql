import { query } from "../../config/db.js";

export const get_user_by_id = async (id) => {
  //

  let message = "Something went wrong",
    code = 500,
    data = [];

  try {
    const user = await query(`SELECT * FROM users WHERE id = ?`, [id]);

    (message = "No user found"), (code = 404), (data = []);

    if (user.length) {
      message = "User fetched Successfully";
      code = 200;
      data = user[0];
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };

  //
};

export const upd = async (req) => {
  //
  //

  let message = "Something went wrong",
    code = 500,
    data = [];

  try {
    const user = await query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? ",
      [req.body.name, req.body.email, req.body.password, req.params.id]
    );

    (message = "No user found"), (code = 404), (data = []);

    if (user.affectedRows === 1) {
      message = "User Update Successfully";
      code = 200;
      data = user;
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };

  //

  //
};

export const del = async (id) => {
  //

  let message = "Something went wrong",
    code = 500,
    data = [];

  try {
    const user = await query("DELETE FROM users WHERE id = ?", [id]);
    (message = "No user found"), (code = 404), (data = []);

    console.log(user);

    if (user.affectedRows === 1) {
      message = "User Deleted Successfully";
      code = 200;
      data = user;
    }
  } catch (error) {
    message = error;
  }

  return { message, code, data };

  //
};

export const get_user_by_email = async (email) => {
  //
  await query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, data) => {
      if (err) throw err;

      return data;
    }
  );

  //
};
