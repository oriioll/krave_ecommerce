import krave_ecommerce_db_pool from "../db/setupdb.js";

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
  const response = await krave_ecommerce_db_pool.query(
    "SELECT * FROM products",
  );
  return response.rows ?? null;
};

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
  const response = await krave_ecommerce_db_pool.query(
    "SELECT * FROM products WHERE id = $1",
    [id],
  );
  return response.rows[0] ?? null;
};

/**
 * Gets all info of the product passed in parameter
 * @param {string} slug The slug of the product you want to select
 * @returns The product selected in JSON format or null
 * @return_format
  { id: 1, name: 'Whey Protein Chocolate', price: 39.99, ... }
 * @author Oriol Plazas León
 * @since 29/04/2026
 */
export const selectProductBySlug = async (slug) => {
  const response = await krave_ecommerce_db_pool.query(
    "SELECT * FROM products WHERE slug = $1",
    [slug],
  );
  return response.rows[0] ?? null;
};

/**
 * Inserts a product into db
 * @param {*} product The product to insert
 * @returns True if the insert was successfull
 * @throws Error if insert fails
 * @author Oriol Plazas León
 * @since 17/05/2026
 */
export const insertProduct = async (product) => {
  const response = await krave_ecommerce_db_pool.query(
    `INSERT INTO products 
    (name, description, price, main_image, hover_image, about_image, info_image, weight, slug)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      product.name,
      product.description,
      product.price,
      product.main_image,
      product.hover_image,
      product.about_image,
      product.info_image,
      product.weight,
      product.slug,
    ],
  );
  return true;
};

/**
 * Removes a product from db
 * @param {*} id The id of the product to delete
 * @returns True if the delete was successfull
 * @throws Error if delete fails
 * @author Oriol Plazas León
 * @since 17/05/2026
 */
export const deleteProductById = async (id) => {
  const response = await krave_ecommerce_db_pool.query(
    "DELETE FROM products WHERE id = $1",
    [id],
  );
  return true;
};

/**
 * Removes a product from db
 * @param {*} slug The slug of the product to delete
 * @returns True if the delete was successfull
 * @throws Error if delete fails
 * @author Oriol Plazas León
 * @since 17/05/2026
 */
export const deleteProductBySlug = async (slug) => {
  const response = await krave_ecommerce_db_pool.query(
    "DELETE FROM products WHERE slug = $1",
    [slug],
  );
  return true;
};

/**
 * Updates a product from db
 * @param {*} slug The slug of the product to update
 * @param {*} product The new data of the product
 * @returns True if the update was successfull
 * @throws Error if update fails
 * @author Oriol Plazas León
 * @since 17/05/2026
 */
export const updateProductBySlug = async (slug, product) => {
  const response = await krave_ecommerce_db_pool.query(
    `UPDATE products SET 
    name=$1, description=$2, price=$3, main_image=$4, hover_image=$5, about_image=$6, info_image=$7, weight=$8, slug=$9 
    WHERE slug=$10`,
    [
      product.name,
      product.description,
      product.price,
      product.main_image,
      product.hover_image,
      product.about_image,
      product.info_image,
      product.weight,
      product.slug,
      slug,
    ],
  );
  return true;
};

/**
 * Updates a product from db
 * @param {*} id The id of the product to update
 * @param {*} product The new data of the product
 * @returns True if the update was successfull
 * @throws Error if update fails
 * @author Oriol Plazas León
 * @since 17/05/2026
 */
export const updateProductById = async (id, product) => {
  const response = await krave_ecommerce_db_pool.query(
    `UPDATE products SET 
    name=$1, description=$2, price=$3, main_image=$4, hover_image=$5, about_image=$6, info_image=$7, weight=$8, slug=$9 
    WHERE id=$10`,
    [
      product.name,
      product.description,
      product.price,
      product.main_image,
      product.hover_image,
      product.about_image,
      product.info_image,
      product.weight,
      product.slug,
      id,
    ],
  );
  return true;
};
