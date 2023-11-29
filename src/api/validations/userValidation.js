export const updateValidation = async (req, res, next) => {
  const { name, email, password } = req.body;

  body("email").custom(async (value) => {});
};
