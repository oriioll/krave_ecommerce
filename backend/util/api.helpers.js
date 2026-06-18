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
  // If there isnt an object in param
  if (!p) return false;
  //Validate obligatory fields
  if (!p.name || !p.description || !p.slug || !p.main_image) return false;
  if (
    p.price === undefined ||
    p.price === null ||
    p.weight === undefined ||
    p.weight === null
  )
    return false;

  //Validate data types
  if (
    typeof p.name !== "string" ||
    typeof p.description !== "string" ||
    typeof p.slug !== "string" ||
    typeof p.main_image !== "string"
  )
    return false;
  if (typeof p.price !== "number" || typeof p.weight !== "number") return false;
  //Validate bussines logic
  if (p.price < 0 || p.weight < 0) return false;
  //Validate data types of optional fields
  if (p.hover_image && typeof p.hover_image !== "string") return false;
  if (p.about_image && typeof p.about_image !== "string") return false;
  if (p.info_image && typeof p.info_image !== "string") return false;
  return true;
};

/**
 * Validates if a user object has all required properties and correct types
 * @param {Object} u - The user object to validate
 * @returns {boolean} True if the user is valid, false otherwise
 */
export const validateUser = (u) => {
  // If there isnt an object in param
  if (!u) return false;
  //Validate obligatory fields
  if (!u.email || !u.pwd || !u.name) return false;
  if (u.role_id === undefined || u.role_id === null) return false;

  //Validate data types
  if (
    typeof u.email !== "string" ||
    typeof u.pwd !== "string" ||
    typeof u.name !== "string"
  )
    return false;
  if (typeof u.role_id !== "number") return false;
  //Validate bussines logic
  if (u.role_id < 0) return false;
  //Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(u.email)) return false;
  return true;
};

/**
 * Validates if a user object for update has all required properties and correct types (no password required)
 * @param {Object} u - The user object to validate
 * @returns {boolean} True if the user is valid, false otherwise
 */
export const validateUserForUpdate = (u) => {
  // If there isnt an object in param
  if (!u) return false;
  //Validate obligatory fields (password NOT required for updates)
  if (!u.email || !u.name) return false;
  if (u.role_id === undefined || u.role_id === null) return false;

  //Validate data types
  if (
    typeof u.email !== "string" ||
    typeof u.name !== "string"
  )
    return false;
  if (typeof u.role_id !== "number") return false;
  //Validate bussines logic
  if (u.role_id < 0) return false;
  //Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(u.email)) return false;
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
