import router from "@/router/router";
import { postProduct } from "@/services/products.fetcher";
import type { Product } from "@/types/Product";
import { handleImagesNulls, validateProduct } from "@/util/validators";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useProductStore = defineStore("createProducts", () => {
  const isLoading = ref(false);
  const error = ref(false);
  const errorMsg = ref("");

  const handleCreateProduct = async (product: Product) => {
    try {
      error.value = false;
      errorMsg.value = "";
      isLoading.value = true;
      //Validate product fields
      const validation = validateProduct(product);
      if (!validation.valid) {
        error.value = true;
        errorMsg.value = validation.error;
        isLoading.value = false;
        return;
      }
      //transform empty string to null
      const transformedProduct = handleImagesNulls(product);
      //post product
      const data = await postProduct(transformedProduct);
      if (data.error) {
        //If api post fails
        console.log(data.message);
        error.value = true;
        errorMsg.value = "Cannot add product.";
        isLoading.value = false;
        return;
      }
      //if post is successfull
      router.push("/product/" + product.slug);
    } catch (e: any) {
      error.value = true;
      errorMsg.value = "Cannot create product";
      isLoading.value = false;
    }
  };
  return {
    isLoading,
    error,
    errorMsg,
    handleCreateProduct,
  };
});
