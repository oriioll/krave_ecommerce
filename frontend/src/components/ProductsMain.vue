<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import type { Product } from '@/types/Product';
import { getProducts } from '@/services/products.fetcher.ts';
import { ref, onMounted } from 'vue';
const error = ref<boolean>(false)
const products = ref<Product[]>([])
onMounted(async () => {
    try {
        error.value = false
        const data = await getProducts();
        if (data.length <= 0 || !data) {
            throw new Error("No products available")
        }
        products.value = data;
    } catch (e: any) {
        error.value = true
    }

})
</script>

<template>
    <div class="mainProducts">
        <h2>Products</h2>
        <section v-if="!error" class="productsGrid">
            <ProductCard v-for="p in products" :key="p.id" :product="p" />
            <br>
        </section>
        <section v-else class="error">
            <h2>Products not available </h2>
        </section>
    </div>
</template>

<style scoped>
.mainProducts {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.productsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.25rem;
}

@media (min-width: 1024px) {
    .mainProducts {
        padding: 2rem;
    }

    .productsGrid {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
}
</style>