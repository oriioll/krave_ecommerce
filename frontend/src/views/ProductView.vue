<script setup lang="ts">
import { getProductBySlug } from '@/services/products.fetcher.ts';
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import type { Product } from '@/types/Product';
const product = ref<Product>()
const route = useRoute();
const slug = route.params.slug as string;
const error = ref(false)
onMounted(async () => {
    try {
        error.value = false
        const data = await getProductBySlug(slug);
        if (!data) {
            throw new Error("Product not found");
        }
        product.value = data;
    } catch (e: any) {
        console.log(e)
        error.value = true;
    }
})
</script>

<template>
    <h1>PRODUCTE</h1>
    <section v-if="!error">
        <h2>{{ product?.name }}</h2>
    </section>
    <section v-else>
        <h1>Error</h1>
    </section>
</template>

<style scoped></style>
