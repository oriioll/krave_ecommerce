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


const goToImage = (dir: string) => {
    const hash = window.location.hash;
    const currentImg = window.location.hash.replace('#image-', '');
    const baseUrl = window.location.href.split('#')[0];
    if (hash == '') {
        dir == 'left' ? window.location.href = baseUrl + '#image-' + 3 : window.location.href = baseUrl + '#image-' + 1;
        return;
    }
    if (dir == 'left') {
        //If the current image - 1 is bigger then 0 (current image is 1, 2...) Substract one, if its 0 or less, new image is still 0
        const newImgNumber = parseInt(currentImg) - 1 >= 0 ? parseInt(currentImg) - 1 : 3;
        window.location.href = baseUrl + '#image-' + newImgNumber;
    } else {
        //If the current image - 1 is bigger then 0 (current image is 1, 2...) Substract one, if its 0 or less, new image is still 0
        const newImgNumber = parseInt(currentImg) + 1 <= 3 ? parseInt(currentImg) + 1 : 0;
        window.location.href = baseUrl + '#image-' + newImgNumber;
    }
}
</script>

<template>
    <aside class="container">
        <div class="slider-wrapper">
            <div class="slider">
                <svg @click="() => goToImage('left')" class="arrow left" xmlns="http://www.w3.org/2000/svg" width="40"
                    height="40" viewBox="0 0 24 24">
                    <path fill="var(--black)"
                        d="M11.8 13H15q.425 0 .713-.288T16 12t-.288-.712T15 11h-3.2l.9-.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275l-2.6 2.6q-.3.3-.3.7t.3.7l2.6 2.6q.275.275.7.275t.7-.275t.275-.7t-.275-.7zm.2 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                </svg>
                <img v-for="(image, index) in images" :src="image" alt="Image of the product" :id="'image-' + index">
                <svg @click="() => goToImage('right')" xmlns="http://www.w3.org/2000/svg" width="40" height="40"
                    viewBox="0 0 24 24" class="arrow right">
                    <path fill="var(--black)"
                        d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m.2-9l-.9.9q-.275.275-.275.7t.275.7t.7.275t.7-.275l2.6-2.6q.3-.3.3-.7t-.3-.7l-2.6-2.6q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l.9.9H9q-.425 0-.712.288T8 12t.288.713T9 13z" />
                </svg>
            </div>
            <div class="slider-nav">
                <a v-for="(_, index) in images" :href="'#image-' + index"></a>
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
    max-width: 100dvw;
    cursor: arrow;
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
    transition: opacity .25s ease;
}

.slider-nav a:hover {
    opacity: 1;
}

.arrow {
    position: absolute;
    top: 50%;
    opacity: .75;
    transition: all .3s ease;
}

.arrow:hover {
    cursor: pointer;
    opacity: .85;
}

.right {
    right: 10px;
}

.left {
    left: 10px;
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