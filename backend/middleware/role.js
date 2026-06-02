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
