<script setup lang="ts">
import ProductImages from '@/components/ProductImages.vue';
import { getProductBySlug } from '@/services/products.fetcher.ts';
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import type { Product } from '@/types/Product';
import Navbar from '@/components/Navbar.vue';
const product = ref<Product>()
const route = useRoute();
const slug = route.params.slug as string;
const error = ref(false)
const isLoading = ref(false)
onMounted(async () => {
    try {
        isLoading.value = true
        error.value = false
        const data = await getProductBySlug(slug);
        if (!data) {
            throw new Error("Product not found");
        }
        product.value = data;
        isLoading.value = false
    } catch (e: any) {
        isLoading.value = false;
        console.log(e)
        error.value = true;
    }
})
</script>

<template>
    <Navbar />
    <!--LOADING STATE-->
    <section v-if="isLoading" class="loading">
        <div class="img-carroussel skeleton"></div>
        <article class="text">
            <div class="skeleton title-skeleton"></div>
            <div class="skeleton price-skeleton"></div>
            <hr>
            <div class="skeleton-group">
                <div class="skeleton line-skeleton"></div>
                <div class="skeleton line-skeleton"></div>
                <div class="skeleton line-skeleton"></div>
            </div>
        </article>
    </section>
    <section v-else-if="!error">
        <ProductImages v-if="product" class="img-carroussel" :key="product?.id" :product="product" />
        <article class="text">
            <h1>{{ product?.name }}</h1>
            <p>{{ product?.price }}€</p>
            <hr>
            <p>{{ product?.description }}</p>
        </article>
    </section>
    <section v-else-if="error">
        <h1>Error</h1>
    </section>
</template>

<style scoped>
/**LOADING SKELETON STYLES */

.skeleton {
    background-color: #f2f2f2;
    /* Gris muy suave */
    position: relative;
    overflow: hidden;
    border-radius: 4px;
}

.skeleton::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%);
    animation: shimmer 1.8s infinite;
    transform: translateX(-100%);
}

.img-carroussel.skeleton {
    aspect-ratio: 3/4;
    height: auto;
}

.title-skeleton {
    height: 2.5rem;
    width: 60%;
}

.price-skeleton {
    height: 1.5rem;
    width: 20%;
}

.line-skeleton {
    height: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
}

.skeleton-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

section {
    width: 100%;
    display: flex;
    flex-direction: column;
    contain: layout style paint;
}

section.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
}

/**GENERAL STYLES */

.img-carroussel {
    width: 100%;
    height: auto;
}

.text {
    padding: 1rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

p {
    font-size: var(--step-0);
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

@media (min-width: 800px) {
    section {
        flex-direction: row;
        gap: 1rem;
    }

    .img-carroussel {
        width: 45%;
        height: auto;
    }

    .text {
        padding-top: 10rem;
    }


    .price-skeleton {
        height: 1.5rem;
        width: 20%;
    }

    .line-skeleton {
        height: 1rem;
        width: 30vw;
        margin-bottom: 0.5rem;
    }
}
</style>
