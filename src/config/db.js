import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs-mysql",
});

// connecting data with node js
db.connect(function (err) {
  if (err) {
    console.error("error" + err);
    return;
  }

  console.log("Data is connected");
});
