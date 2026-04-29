/**
 * Fetches local api data to the endpoint passed in parameter
 * @param endpoint The endpoint of the local api you want to fetch
 * @returns The api response
 * @author Oriol Plazas León
 * @since 27/04/2026
 */
export const fetchDataByEndpoint = async (endpoint: string) => {
  const url = "http://localhost:3000" + endpoint;
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) {
    throw new Error("Cannot fetch api: " + data.error.message);
  }
  return data;
};

/**
 * Gets all the products returned by the local api
 * @returns All the products returned
 * @author Oriol Plazas León
 * @since 27/04/2026
 */
export const getProducts = async () => {
  const data = await fetchDataByEndpoint("/products");
  return data;
};

/**
 * Gets the product with the id in parameter
 * @returns The product with that id
 * @author Oriol Plazas León
 * @since 27/04/2026
 */
export const getProductById = async (id: number) => {
  const data = await fetchDataByEndpoint("/products/" + id);
  return data;
};

/**
 * Gets the product with the slug in parameter
 * @returns The product with that slug
 * @author Oriol Plazas León
 * @since 29/04/2026
 */
export const getProductBySlug = async (slug: string) => {
  const data = await fetchDataByEndpoint("/product/slug/" + slug);
  return data;
};
