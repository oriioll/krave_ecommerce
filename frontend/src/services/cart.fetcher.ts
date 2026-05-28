const BASE_API_URL = import.meta.env.VITE_API_URL;
import type { Product } from "@/types/Product";

/**
 * Gets all the cart items of the current logged user
 * @returns An object with the status and the items of the logged user cart
 * @throws {Error} If api fetch fails
 * @author Oriol Plazas León
 * @since 28/05/2026
 */
export const getUserCart = async () => {
  const url: string = BASE_API_URL + "/cart";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

/**
 * Stores a product into your cart
 * @param product_id the id of the product to store into cart
 * @returns An object with the status and feedback
 * @throws {Error} If api fetch fails
 * @author Oriol Plazas León
 * @since 28/05/2026
 */
export const postProductIntoCart = async (product_id: number) => {
  const url: string = BASE_API_URL + "/cart";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: product_id }),
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
