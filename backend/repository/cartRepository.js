import krave_ecommerce_db_pool from "../db/setupdb.js";

export const getCartByUserId = async (user_id) => {
  const response = await krave_ecommerce_db_pool.query(
    "SELECT * FROM CART WHERE user_id = $1",
    [user_id],
  );
  return response.rows ?? null;
};

export const getCartItemsByCartId = async (cart_id) => {
  const response = await krave_ecommerce_db_pool.query(
    "SELECT product_id, quantity FROM CART_ITEMS WHERE cart_id = $1",
    [cart_id],
  );
  return response.rows ?? null;
};
