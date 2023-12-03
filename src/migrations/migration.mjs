import mysql2 from "mysql2";
import migration from "mysql-migrations";
import path from "path";

const __dirname = path.resolve();

const connection = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs-mysql",
});

migration.init(connection, __dirname, function () {
  console.log("finished running migrations");
});
