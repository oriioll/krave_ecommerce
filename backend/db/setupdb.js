import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

/**
 * Pool object from node-postgres with db credentials gotten from .env file
 */
const krave_ecommerce_db_pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5423
});

export default krave_ecommerce_db_pool;
