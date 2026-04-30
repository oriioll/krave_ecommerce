<script setup lang="ts">
import { getProductBySlug } from '@/services/products.fetcher.ts';
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import type { Product } from '@/types/Product';
import Navbar from '@/components/Navbar.vue';
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
    <Navbar />
    <section v-if="!error">
        <img v-if="product?.main_image" :src="product.main_image" alt="">
        <article class="text">
            <h1>{{ product?.name }}</h1>
            <p>{{ product?.price }}€</p>
            <hr>
            <p>{{ product?.description }}</p>
        </article>
    </section>
    <section v-else>
        <h1>Error</h1>
    </section>
</template>

<style scoped>
section {
    width: 100%;
    display: flex;
    flex-direction: column;
}

img {
    width: 100%;
    height: auto;
}

.text {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

p {
    font-size: var(--step-0);
}

@media (min-width: 800px) {
    section {
        flex-direction: row;
    }

    img {
        width: 40%;
        height: auto;
    }
}
</style>
