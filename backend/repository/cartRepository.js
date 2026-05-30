import krave_ecommerce_db_pool from "../db/setupdb.js";

/**
 * Gets a cart by user ID
 * @param {number} user_id - The ID of the user
 * @returns {Promise<Array|null>} The cart object or null if not found
 * @author Oriol Plazas León
 * @throws Error if query fails
 */
export const getCartByUserId = async (user_id) => {
  const response = await krave_ecommerce_db_pool.query(
    "SELECT * FROM CART WHERE user_id = $1",
    [user_id],
  );
  return response.rows[0] ?? null;
};

/**
 * Gets all items in a cart by cart ID
 * @param {number} cart_id - The ID of the cart
 * @returns {Promise<Array|null>} Array of cart items with product_id and quantity or null
 * @author Oriol Plazas León
 * @throws Error if query fails
 */
export const getCartItemsByCartId = async (cart_id) => {
  const response = await krave_ecommerce_db_pool.query(
    "SELECT product_id, quantity FROM CART_ITEMS WHERE cart_id = $1",
    [cart_id],
  );
  return response.rows ?? null;
};

/**
 * Inserts a product into a cart
 * @param {number} cart_id - The ID of the cart
 * @param {number} product_id - The ID of the product to insert
 * @returns {boolean} True if the insert was successful
 * @author Oriol Plazas León
 * @throws Error if insert fails
 */
export const insertProductIntoCart = async (cart_id, product_id) => {
  const response = await krave_ecommerce_db_pool.query(
    `INSERT INTO cart_items 
  (cart_id, product_id)
   VALUES ($1, $2)`,
    [cart_id, product_id],
  );
  return result.rowCount > 0;
};

/**
 * Updates the quantity of a product in a cart
 * @param {number} cart_id - The ID of the cart
 * @param {number} product_id - The ID of the product
 * @param {number} quantity - The new quantity value
 * @returns {boolean} True if the update was successful
 * @author Oriol Plazas León
 * @throws Error if update fails
 */
export const updateProductQuantity = async (cart_id, product_id, quantity) => {
  const response = await krave_ecommerce_db_pool.query(
    `UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
    [quantity, cart_id, product_id],
  );
  return result.rowCount > 0;
};

/**
 * Deletes all items from a cart
 * @param {number} cart_id - The ID of the cart
 * @returns {boolean} True if the update was successful
 * @author Oriol Plazas León
 * @throws Error if delete fails
 */
export const deleteAllCartItems = async (cart_id) => {
  const response = await krave_ecommerce_db_pool.query(
    `DELETE FROM cart_items WHERE cart_id = $1`,
    [cart_id],
  );
  return result.rowCount > 0;
};

/**
 * Deletes an items from a cart
 * @param {number} cart_id - The ID of the cart
 * @param {number} productId - The id of the product
 * @returns {boolean} True if the update was successful
 * @author Oriol Plazas León
 * @throws Error if delete fails
 */
export const deleteProductFromCart = async (cart_id, productId) => {
  const response = await krave_ecommerce_db_pool.query(
    `DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
    [cart_id, productId],
  );
  return result.rowCount > 0;
};
