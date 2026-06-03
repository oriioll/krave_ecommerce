import krave_ecommerce_db_pool from "../db/setupdb.js";

/**
 * Creates a new user in the database
 * @param {string} email - The email of the user
 * @param {string} pwd - The password of the user
 * @param {string} name - The name of the user
 * @returns {Promise<Object>} The created user object
 * @author Oriol Plazas León
 * @throws Error if insert fails
 */
export const createCustomer = async (email, pwd, name) => {
  const response = await krave_ecommerce_db_pool.query(
    `INSERT INTO users 
    (email, password, name, role_id)
   VALUES ($1, $2, $3, $4)
   RETURNING *`,
    [email, pwd, name, 2],
  );
  return response.rows[0];
};

/**
 * Gets a user from the database by email
 * @param {string} email - The email of the user to retrieve
 * @returns {Promise<Array|null>} The user object or null if not found
 * @author Oriol Plazas León
 * @throws Error if query fails
 */
export const getUserByEmail = async (email) => {
  const response = await krave_ecommerce_db_pool.query(
    `
        SELECT u.*, r.name AS role_name FROM users u JOIN roles r ON r.id = u.role_id WHERE email = $1
        `,
    [email],
  );
  return response.rows[0] ?? null;
};
