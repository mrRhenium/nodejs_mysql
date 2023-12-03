import jwt from "jsonwebtoken";

// verify the user on basis of their cookies
export const verifyToken = async (req, res, next) => {
  try {
    //

    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];

      req.token = bearerToken;

      jwt.verify(req.token, process.env.ACCESS_TOKEN, (err) => {
        if (err) {
          return res
            .status(403)
            .json({ status: 403, msg: "User is not authenticated" });
        }

        next();
      });

      //
    } else {
      return res.json({ status: 403, msg: "User is not authenticated" });
    }

    //
  } catch (err) {
    console.log(err);
    throw err;
  }
};
