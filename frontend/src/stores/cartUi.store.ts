// stores/cartUi.store.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("cartUi", () => {
  const isCartOpen = ref(false);

  const openCart = () => {
    isCartOpen.value = true;
  };
  const closeCart = () => {
    isCartOpen.value = false;
  };

  return { isCartOpen, openCart, closeCart };
});
