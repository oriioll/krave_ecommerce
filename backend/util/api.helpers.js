import jwt from "jsonwebtoken";

/**
 * Extracts and verifies user information from the JWT token in request cookies
 * @param {Object} req - Express request object
 * @returns {Object} Decoded token with user_id and mail
 * @throws {Error} If token is missing or invalid
 */
export const extractUserFromToken = (req) => {
  const token = req.cookies.token;
  if (!token) {
    throw new Error("No authorized - please log in");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (e) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Generates a success feedback response object
 * @param {string} op - The operation performed (e.g., 'created', 'updated', 'deleted')
 * @returns {Object} Feedback object with message and success status
 */
export const getFeedback = (op) => {
  return {
    message: "Product " + op + " successfully",
    status: "success",
  };
};

/**
 * Generates an error response object
 * @param {string} log - The error log message
 * @param {string} op - The operation that failed
 * @param {string} data - The data involved in the failed operation
 * @returns {Object} Error object with error details and status code
 */
export const getError = (log, op, data) => {
  return {
    error: true,
    message: `Cannot ${op} ${data}`,
    log: log,
    status: "error",
    code: 500,
  };
};

/**
 * Validates if a product object has all required properties and correct types
 * @param {Object} p - The product object to validate
 * @returns {boolean} True if the product is valid, false otherwise
 */
export const validateProduct = (p) => {
  if (
    p.name === undefined ||
    p.description === undefined ||
    p.price === undefined ||
    p.main_image === undefined ||
    p.hover_image === undefined ||
    p.about_image === undefined ||
    p.info_image === undefined ||
    p.weight === undefined ||
    p.slug === undefined
  ) {
    return false;
  }
  if (
    typeof p.name !== "string" ||
    typeof p.description !== "string" ||
    typeof p.main_image !== "string" ||
    typeof p.hover_image !== "string"
  ) {
    return false;
  }
  if (
    typeof p.price !== "number" ||
    p.price <= 0 ||
    typeof p.weight !== "number"
  ) {
    return false;
  }
  return true;
};

/**
 * Generates a jwt based on user_id and mail and sets a cookie in server with the token,
 * @param {*} res The response express endpoint parameter to set the cookie
 * @param {*} user_id the user_id to identify token
 * @param {*} mail The user email in token
 * @param {*} mail The role of the user
 * @param {*} days In how many days will the token expire
 * @returns The jwt created
 */
export const setUserToken = (res, user_id, mail, role, days = 7) => {
  const token = jwt.sign(
    { user_id: user_id, mail: mail, role: role },
    process.env.JWT_SECRET,
    { expiresIn: `${days}d` },
  );

  //verify if req is sent from production or dev
  const isProd = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax", //depends if is hosted on production or not, configures secure if both front + back are https, and sameSite tu lax if http with both localhost
    maxAge: days * 24 * 60 * 60 * 1000,
  });

  return token;
};
