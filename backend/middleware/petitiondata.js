import {
  validateProduct,
  validateUser,
  validateUserForUpdate,
} from "../util/api.helpers.js";

export const validId = async (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if (id < 0 || Number.isNaN(id)) {
    return res.status(400).json({
      error: "true",
      status: "error",
      message: "id is not valid, must be a number",
    });
  }
  next();
};

export const validProductId = async (req, res, next) => {
  const id = Number.parseInt(req.params.productId);
  if (id < 0 || Number.isNaN(id)) {
    return res.status(400).json({
      error: "true",
      status: "error",
      message: "id is not valid, must be a number",
    });
  }
  next();
};

export const validProduct = async (req, res, next) => {
  const product = req.body;
  if (!validateProduct(product)) {
    return res.status(400).json({
      error: true,
      status: "error",
      message: "Cannot process product - Product not valid",
    });
  }
  next();
};

export const validUser = async (req, res, next) => {
  const user = req.body;
  if (!validateUser(user)) {
    return res.status(400).json({
      error: true,
      status: "error",
      message: "Cannot process user - User not valid",
    });
  }
  next();
};

export const validUserUpdate = async (req, res, next) => {
  const user = req.body;
  if (!validateUserForUpdate(user)) {
    return res.status(400).json({
      error: true,
      status: "error",
      message: "Cannot process user update - User data not valid",
    });
  }
  next();
};

export const validRegisterBody = async (req, res, next) => {
  const { email, pwd, name } = req.body;
  if (!email || !pwd || !name) {
    return res.status(400).json({
      status: "error",
      message: "ERROR: need more body data or data is incorrect",
      error: true,
    });
  }
  next();
};
export const validLoginBody = async (req, res, next) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    return res.status(400).json({
      status: "error",
      message: "ERROR: need more body data or data is incorrect",
      error: true,
    });
  }
  next();
};

export const validCartItemBody = async (req, res, next) => {
  const productId = req.body.product_id;
  if (!productId || Number.isNaN(productId)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid or missing productId",
      error: true,
    });
  }
  next();
};
