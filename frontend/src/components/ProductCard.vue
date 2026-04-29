<script setup lang="ts">
import type { Product } from '@/types/Product';
const props = defineProps<{
    product: Product
}>()

</script>

<template>
    <article>
        <div class="imgContainer">
            <img class="mainImg" v-if="product.main_image" :src="product.main_image"
                :alt="'Image of product: ' + product.name">
            <img class="hoverImg" v-if="product.hover_image" :src="product.hover_image"
                :alt="'Image of product: ' + product.name">
        </div>
        <div class="textInfo">
            <h5>
                <router-link :to="'/product/' + product.slug">
                    {{ product.name }}
                </router-link>
            </h5>
            <p>{{ product.price }}€</p>
        </div>
    </article>
</template>

<style scoped>
article {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .75rem;
}

img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 3/4;
    transition: transform 0.25s ease, opacity 0.25s ease;
}

.imgContainer {
    position: relative;
    aspect-ratio: 3/4;
    width: 100%;
    overflow: hidden;
}

.mainImg {
    z-index: 2;
    opacity: 1;
}

.hoverImg {
    z-index: 1;
    opacity: 0;
}

.imgContainer:hover .mainImg {
    opacity: 0;
    transform: scale(1.1);
    z-index: 3;
}

.imgContainer:hover .hoverImg {
    opacity: 1;
    transform: scale(1.05);
}

.textInfo {
    padding-left: 1rem;
}

a {
    color: var(--black);
    text-decoration: none;
}

@media (min-width: 1024px) {}
</style>