import router from "@/router/router";
import { deleteProductById, putProductById } from "@/services/products.fetcher";
import type { Product } from "@/types/Product";
import { handleImagesNulls, validateProduct } from "@/util/validators";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useProductManagementStore = defineStore("editProducts", () => {
  const isLoadingEdit = ref(false);
  const isLoadingDelete = ref(false);
  const error = ref(false);
  const errorMsg = ref("");
  const handleProductModification = async (product: Product) => {
    try {
      error.value = false;
      errorMsg.value = "";
      isLoadingEdit.value = true;
      //Validate product fields
      const validation = validateProduct(product);
      if (!validation.valid) {
        error.value = true;
        errorMsg.value = validation.error;
        isLoadingEdit.value = false;
        return;
      }
      //transform empty string to null
      const transformedProduct = handleImagesNulls(product);
      const data = await putProductById(product.id!, transformedProduct);
      if (data.error) {
        //If api post fails
        error.value = true;
        errorMsg.value =
          "Cannot edit product. - Make sure all fields are filled ";
        isLoadingEdit.value = false;
        return;
      }
      //if post is successfull
      router.push("/manage-products");
    } catch (e: any) {
      error.value = true;
      errorMsg.value = "Cannot edit product";
      isLoadingEdit.value = false;
    }
  };
  const handleProductDelete = async (product_id: number) => {
    try {
      error.value = false;
      errorMsg.value = "";
      isLoadingDelete.value = true;
      const data = await deleteProductById(product_id);
      if (data.error) {
        //If api post fails
        error.value = true;
        errorMsg.value = "Cannot delete product.";
        isLoadingDelete.value = false;
        return;
      }
      //if post is successfull
      router.push("/manage-products");
    } catch (e: any) {
      error.value = true;
      errorMsg.value = "Cannot delete product";
      isLoadingDelete.value = false;
    }
  };
  return {
    isLoadingEdit,
    isLoadingDelete,
    error,
    errorMsg,
    handleProductDelete,
    handleProductModification,
  };
});
