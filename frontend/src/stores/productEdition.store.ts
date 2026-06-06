import router from "@/router/router";
import { deleteProductById } from "@/services/products.fetcher";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useProductManagementStore = defineStore("editProducts", () => {
  const isLoadingEdit = ref(false);
  const isLoadingDelete = ref(false);
  const error = ref(false);
  const errorMsg = ref("");
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
  };
});
