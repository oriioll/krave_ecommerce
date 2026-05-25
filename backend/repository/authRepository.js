import krave_ecommerce_db_pool from "../db/setupdb.js";

export const createUser = async (email, pwd, name) => {
  const response = await krave_ecommerce_db_pool.query(
    `INSERT INTO users 
    (email, password, name)
   VALUES ($1, $2, $3)`,
    [email, pwd, name],
  );
  return true;
};
