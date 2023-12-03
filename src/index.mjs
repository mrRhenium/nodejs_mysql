import express from "express";
import dotenv from "dotenv";

import router from "./api/routes/api.mjs";

const app = express();
const port = 3000;

// middlewares
dotenv.config();
// parse the upcoming form data in the form of URL
app.use(express.urlencoded({ extended: false }));
// parse the upcoming json body from client
app.use(express.json());

app.use("/", router);

// creating the server
app.listen(port, () => {
  console.log(`Server is running at port no. ${port}`);
});
