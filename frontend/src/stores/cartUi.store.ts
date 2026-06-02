import { defineStore } from "pinia";
import { ref } from "vue";
import type { ProductQuant } from "@/types/ProductQuant";
import {
  getUserCart,
  deleteItemFromCart,
  putProductFromCart,
} from "@/services/cart.fetcher";
import { getProductById } from "@/services/products.fetcher";
import { userIsLogged } from "@/services/auth.fetcher";

export const useUIStore = defineStore("cartUi", () => {
  const isCartOpen = ref(false);
  const cartItems = ref<ProductQuant[]>([]);
  const cartError = ref(false);
  const cartErrorMsg = ref("");
  const isCartLoading = ref(false);
  const subtotal = ref(0);

  const loadCartItems = async () => {
    try {
      subtotal.value = 0;
      isCartLoading.value = true;
      cartError.value = false;
      cartErrorMsg.value = "";
      //if user isnt logged, throw error and display it
      const userLogged = await userIsLogged();
      if (userLogged.error || userLogged.loggedIn === false) {
        throw new Error("Log in to add products to your cart!");
      }
      //if api returns error geting the cart
      const cartData = await getUserCart();
      if (cartData.error) {
        throw new Error("Cannot get user cart");
      }
      //if isnt the cart items list isnt an array
      const items = cartData.items;
      if (!Array.isArray(items)) {
        cartItems.value = [];
        isCartLoading.value = false;
        return;
      }
      //for each item, push it to the cart item array with the quantity
      cartItems.value = [];
      for (const item of items) {
        //get all product info from its id
        const product = await getProductById(item.product_id);
        //modify subtotal quantity
        subtotal.value += product.price * item.quantity;
        cartItems.value.push({
          quantity: item.quantity,
          ...product,
        });
      }
    } catch (e: any) {
      cartError.value = true;
      cartErrorMsg.value = e.message;
      cartItems.value = [];
    } finally {
      isCartLoading.value = false;
    }
  };

  const openCart = async () => {
    await loadCartItems();
    isCartOpen.value = true;
    document.body.style.overflow = "hidden";
    document.body.classList.add("lessOpacity");
  };

  const closeCart = () => {
    isCartOpen.value = false;
    document.body.style.overflow = "";
    document.body.classList.remove("lessOpacity");
  };
  const reduceCartItem = async (id: number, currentQuantity: number) => {
    cartError.value = false;
    const productToRemove = cartItems.value.find((p) => p.id == id);
    if (!productToRemove) return;

    if (productToRemove.quantity <= 1) {
      const deleted = await deleteItemFromCart(id);
      if (deleted.error) {
        cartError.value = true;
        cartErrorMsg.value = "Cannot delete product from cart";
        return;
      }
    } else {
      const modified = await putProductFromCart(id, currentQuantity - 1);
      if (modified.error) {
        cartError.value = true;
        cartErrorMsg.value = "Cannot modify product from cart";
        return;
      }
    }
    await loadCartItems();
  };

  const increaseCartItem = async (id: number, currentQuantity: number) => {
    cartError.value = false;
    const modified = await putProductFromCart(id, currentQuantity + 1);
    if (modified.error) {
      cartError.value = true;
      cartErrorMsg.value = "Cannot modify product from cart";
      return;
    }
    await loadCartItems();
  };
  return {
    isCartOpen,
    cartItems,
    cartError,
    cartErrorMsg,
    isCartLoading,
    subtotal,
    openCart,
    closeCart,
    loadCartItems,
    reduceCartItem,
    increaseCartItem,
  };
});
