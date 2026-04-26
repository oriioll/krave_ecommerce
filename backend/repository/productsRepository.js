import krave_ecommerce_db_pool from '../db/setupdb.js';

/**
 * Gets all info of all products using a query into DB
 * @query SELECT * FROM products
 * @returns All products in JSON format or null
 * @return_format [
  { id: 1, name: 'Whey Protein Chocolate', price: 39.99, ... },
  { id: 2, name: 'Whey Protein Vanilla', price: 39.99, ... },
  ]
 * @author Oriol Plazas León
 * @since 26/04/2026
 */
export const selectAllProducts = async () => {
    const response = await krave_ecommerce_db_pool.query('SELECT * FROM products');
    return response.rows ?? null;
}

/**
 * Gets all info of the product passed in parameter
 * @param {number} id The id of the product you want to select 
 * @returns The product selected in JSON format or null
 * @return_format
  { id: 1, name: 'Whey Protein Chocolate', price: 39.99, ... }
 * @author Oriol Plazas León
 * @since 26/04/2026
 */
export const selectProductById = async (id) => {
    const response = await krave_ecommerce_db_pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return response.rows[0] ?? null;
}