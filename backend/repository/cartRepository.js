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

export const insertProductIntoCart = async (cart_id, product_id) => {
  const response = await krave_ecommerce_db_pool.query(
    `INSERT INTO cart_items 
  (cart_id, product_id)
   VALUES ($1, $2)`,
    [cart_id, product_id],
  );
  return result.rowCount > 0;
};

export const updateProductQuantity = async (cart_id, product_id, quantity) => {
  const response = await krave_ecommerce_db_pool.query(
    `UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
    [quantity, cart_id, product_id],
  );
  return result.rowCount > 0;
};
