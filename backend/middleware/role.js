import { extractUserFromToken } from "../util/api.helpers.js";

/**
 * Middleware function that checks if the authenticathed user is an admin or not
 */
export const isAdmin = async (req, res, next) => {
  const { role } = extractUserFromToken(req);
  if (role != "admin") {
    return res
      .status(403)
      .json({ error: true, status: "error", message: "Forbidden" });
  } else {
    next();
  }
};

export const isAdminOrStaff = async (req, res, next) => {
  const { role } = extractUserFromToken(req);
  console.log(role);
  if (role != "admin" && role != "staff") {
    return res
      .status(403)
      .json({ error: true, status: "error", message: "Forbidden" });
  } else {
    next();
  }
};
