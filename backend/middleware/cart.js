import { getCartByUserId } from "../repository/cartRepository";

export const attachCart = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    const cart = await getCartByUserId(user_id);
    if (!cart) {
      return res.status(404).json({
        status: "error",
        message: "Cart not found for user id: " + user_id,
        error: true,
      });
    }
    req.cart = cart;
    next();
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message, error: true });
  }
};
