<script setup lang="ts">
import ProductCard from './ProductCard.vue';
import type { Product } from '@/types/Product';
import { getProducts } from '@/services/products.fetcher.ts';
import { ref, onMounted } from 'vue';
const error = ref<boolean>(false)
const products = ref<Product[]>([]);
const isLoading = ref(true)
onMounted(async () => {
    try {
        isLoading.value = true;
        error.value = false
        const data = await getProducts();
        if (data.length <= 0 || !data) {
            throw new Error("No products available")
        }
        products.value = data;
        isLoading.value = false
    } catch (e: any) {
        isLoading.value = false;
        error.value = true
    }

})
</script>

<template>
    <div class="mainProducts">
        <h2>Products</h2>
        <section v-if="isLoading" class="productsGrid loading">
            <article class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-text">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-price"></div>
                </div>
            </article>
            <article class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-text">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-price"></div>
                </div>
            </article>
            <article class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-text">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-price"></div>
                </div>
            </article>
            <article class="skeleton-card">
                <div class="skeleton-image"></div>
                <div class="skeleton-text">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-price"></div>
                </div>
            </article>
        </section>
        <section v-else-if="!error && !isLoading" class="productsGrid">
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
    min-height: 140vh;
}

/*LOADING SKELETON STYLES */

.skeleton-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.skeleton-image {
    width: 100%;
    aspect-ratio: 3/4;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%);
    background-color: #f2f2f2;
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
    border-radius: 4px;
}

.skeleton-text {
    padding-left: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.skeleton-title {
    height: 1rem;
    width: 80%;
    background-color: #f2f2f2;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
    border-radius: 4px;
}

.skeleton-price {
    height: 0.75rem;
    width: 40%;
    background-color: #f2f2f2;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

/**GENERAL STYLES */
.productsGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.25rem;
}

@media (min-width: 800px) {
    .productsGrid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (min-width: 1000px) {
    .mainProducts {
        padding: 2rem;
    }

    .productsGrid {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
}
</style>