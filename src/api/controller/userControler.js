import { get_user_by_id, upd, del } from "../models/userModel.js";

export const get_user = async (req, res, next) => {
  try {
    const response = await get_user_by_id(req.params.id);

    return res.status(response.code).json({
      message: response.message,
      data: response.data,
      code: response.code,
    });
  } catch (error) {
    next(error);
  }
};

export const upd_user = async (req, res, next) => {
  try {
    const response = await upd(req);

    return res.status(response.code).json({
      message: response.message,
      data: response.data,
      code: response.code,
    });
  } catch (error) {
    next(error);
  }
};

export const del_user = async (req, res, next) => {
  try {
    const response = await del(req.params.id);

    return res.status(response.code).json({
      message: response.message,
      data: response.data,
      code: response.code,
    });
  } catch (error) {
    next(error);
  }
};
