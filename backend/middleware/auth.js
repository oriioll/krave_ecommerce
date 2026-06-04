import { extractUserFromToken } from "../util/api.helpers.js";

/**
 * Middleware function that checks if the authenticathed user is an admin or not
 */
export const isAdmin = async (req, res, next) => {
  try {
    const { role } = extractUserFromToken(req);
    if (role !== "admin") {
      return res
        .status(403)
        .json({ error: true, status: "error", message: "Forbidden" });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      error: true,
      status: "error",
      message: "Unauthorized: Invalid or missing token",
    });
  }
};

/**
 * Middleware function that checks if the authenticathed user is an admin / staff or not
 */
export const isAdminOrStaff = async (req, res, next) => {
  try {
    const { role } = extractUserFromToken(req);
    if (role !== "admin" && role !== "staff") {
      return res
        .status(403)
        .json({ error: true, status: "error", message: "Forbidden" });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      error: true,
      status: "error",
      message: "Unauthorized: Invalid or missing token",
    });
  }
};

export const checkUser = async (req, res, next) => {
  try {
    const userData = extractUserFromToken(req);
    req.user = userData;
    next();
  } catch (e) {
    res.status(401).json({ status: "error", message: e.message, error: true });
  }
};
