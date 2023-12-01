import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

export const query = async (sql, params) => {
  const options = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs-mysql",
  };

  const connection = await mysql.createConnection(options);
  const [result] = await connection.execute(sql, params);
  // console.log(result);
  connection.end();

  console.log("Database is connected!");

  return result;
};
