import type { Product } from "@/types/Product";
const BASE_API_URL = import.meta.env.VITE_API_URL;
/**
 * Fetches local api data to the endpoint passed in parameter
 * @param endpoint The endpoint of the local api you want to fetch
 * @returns The api response
 * @author Oriol Plazas León
 * @since 27/04/2026
 */
export const fetchDataByEndpoint = async (endpoint: string) => {
  const url = BASE_API_URL + endpoint;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching endpoint: " + endpoint);
  const data = await response.json();
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
  const data = await fetchDataByEndpoint("/products/slug/" + slug);
  return data;
};

/**
 * Posts a product to the local api
 * @param product The product to post
 * @returns True if the product was posted successfully
 * @author Oriol Plazas León
 * @since 19/05/2026
 */
export const postProduct = async (product: Product) => {
  const url = BASE_API_URL + "/products";
  const success = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });
  const response = await success.json();
  return response;
};

/**
 * Deletes the product with the id in parameter
 * @param id The id of the product to delete
 * @returns True if the product was deleted successfully
 * @author Oriol Plazas León
 * @since 19/05/2026
 */
export const deleteProductById = async (id: number) => {
  const url = BASE_API_URL + "/products/" + id;
  const success = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  const response = await success.json();
  return response;
};

/**
 * Deletes the product with the slug in parameter
 * @param slug The slug of the product to delete
 * @returns True if the product was deleted successfully
 * @author Oriol Plazas León
 * @since 19/05/2026
 */
export const deleteProductBySlug = async (slug: string) => {
  const url = BASE_API_URL + "/products/slug/" + slug;
  const success = await fetch(url, {
    method: "DELETE",
    credentials: "include",
  });
  const response = await success.json();
  return response;
};

/**
 * Updates the product with the id in parameter
 * @param id The id of the product to update
 * @param product The product data to update
 * @returns True if the product was updated successfully
 * @author Oriol Plazas León
 * @since 20/05/2026
 */
export const putProductById = async (id: number, product: Product) => {
  const url = BASE_API_URL + "/products/" + id;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });
  const success = await response.json();
  return success;
};

/**
 * Updates the product with the slug in parameter
 * @param slug The slug of the product to update
 * @param product The product data to update
 * @returns True if the product was updated successfully
 * @author Oriol Plazas León
 * @since 20/05/2026
 */
export const putProductBySlug = async (slug: string, product: Product) => {
  const url = BASE_API_URL + "/products/slug/" + slug;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(product),
  });
  const success = await response.json();
  return success;
};
