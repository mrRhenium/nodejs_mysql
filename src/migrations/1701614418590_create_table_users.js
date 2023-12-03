module.exports = {
  up: "CREATE TABLE users (id INT NOT NULL UNIQUE, name VARCHAR(225), email VARCHAR(225), password VARCHAR(225))",

  down: "DROP TABLE users",
};
