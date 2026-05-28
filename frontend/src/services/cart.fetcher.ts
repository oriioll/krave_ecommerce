const BASE_API_URL = import.meta.env.VITE_API_URL;
//import type { Product } from "@/types/Product";

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
  const url: string = BASE_API_URL + "/cart/items";
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

/**
 * Updates the quantity of a product in your cart
 * @param product_id the id of the product to update in cart
 * @param newQuantity the new quantity of the product
 * @returns An object with the status and feedback
 * @throws {Error} If api fetch fails
 * @author Oriol Plazas León
 * @since 28/05/2026
 */
export const putProductFromCart = async (
  productId: number,
  newQuantity: number,
) => {
  const url: string = BASE_API_URL + "/cart/items/" + productId;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: newQuantity }),
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

/**
 * Empties the user cart
 * @returns An object with the status
 * @throws {Error} If api fetch fails
 * @author Oriol Plazas León
 * @since 28/05/2026
 */
export const emptyUserCart = async () => {
  const url: string = BASE_API_URL + "/cart";
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

/**
 * Deletes an item from user cart
 * @param {number} productId the id of the product to delete from cart
 * @returns An object with the status
 * @throws {Error} If api fetch fails
 * @author Oriol Plazas León
 * @since 28/05/2026
 */
export const deleteItemFromCart = async (productId: number) => {
  const url: string = BASE_API_URL + "/cart/items/" + productId;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
