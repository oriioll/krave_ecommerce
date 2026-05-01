<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '@/types/Product';
const props = defineProps<{
    product: Product
}>()

//Get an image array filtered to only get not null images
const images = ref<string[]>([])
images.value = [
    props.product.main_image,
    props.product.hover_image,
    props.product.about_image,
    props.product.info_image
].filter(i => i != null && i != undefined);
</script>

<template>
    <aside class="container">
        <div class="slider-wrapper">
            <div class="slider">
                <img v-for="(image, index) in images" :src="image" alt="Image of the product" :id="'image-' + index">
            </div>
            <div class="slider-nav">
                <a v-for="(image, index) in images" :href="'#image-' + index"></a>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.slider-wrapper {
    position: relative;

}

.slider {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    box-shadow: 0 .75rem 1.5rem -0.75rem hsla(0, 0%, 0%, 0.01);
    border-radius: 2px;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.slider::-webkit-scrollbar {
    display: none;
}

img {
    flex: 1 0 100%;
    scroll-snap-align: start;
    object-fit: cover;
}

.slider-nav {
    display: flex;
    gap: 1rem;
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}

.slider-nav a {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--black);
    opacity: .75;
    transition: opacity ease .25s;
}

.slider-nav a:hover {
    opacity: 1;
}


@media (min-width: 800px) {
    .slider-nav {
        gap: 1.75rem;
    }

    .slider-nav a {
        width: .7rem;
        height: .7rem;
    }
}
</style>