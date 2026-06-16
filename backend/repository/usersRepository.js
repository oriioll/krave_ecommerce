import krave_ecommerce_db_pool from "../db/setupdb.js";

/**
 * Gets all info of all users using a query into DB
 * @query SELECT * FROM users
 * @returns All users in JSON format or null
 * @author Oriol Plazas León
 * @since 16/06/2026
 */
export const selectAllUsers = async () => {
  const response = await krave_ecommerce_db_pool.query("SELECT * FROM users");
  return response.rows ?? null;
};

/**
 * Removes a user from db
 * @param {*} id The id of the user to delete
 * @returns True if the delete was successfull
 * @throws Error if delete fails
 * @author Oriol Plazas León
 * @since 16/06/2026
 */
export const deleteUserById = async (id) => {
  const response = await krave_ecommerce_db_pool.query(
    "DELETE FROM users WHERE id = $1",
    [id],
  );
  return response.rowCount > 0;
};

/**
 * Updates a user from db
 * @param {*} id The id of the user to update
 * @param {*} user The new data of the user
 * @returns True if the update was successfull
 * @throws Error if update fails
 * @author Oriol Plazas León
 * @since 16/06/2026
 */
export const updateUserById = async (id, user) => {
  const response = await krave_ecommerce_db_pool.query(
    `UPDATE users SET 
    email=$1, password=$2, name=$3, role_id=$4
    WHERE id=$5`,
    [user.email, user.password, user.name, user.role_id, id],
  );
  return response.rowCount > 0;
};
