<script setup lang="ts">
import ProductImages from '@/components/ProductImages.vue';
import { getProductBySlug } from '@/services/products.fetcher.ts';
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import type { Product } from '@/types/Product.ts';
import Navbar from '@/components/Navbar.vue';
import { postProductIntoCart } from '@/services/cart.fetcher.ts';
import { userIsLogged } from '@/services/auth.fetcher.ts';
import router from '@/router/router';
import { useUIStore } from '@/stores/cartUi.store.ts'
const cartUiStore = useUIStore()
const product = ref<Product>()
const route = useRoute();
const slug = route.params.slug as string;
const error = ref(false)
const cartError = ref(false)
const errorMsg = ref('')
const isLoading = ref(false)
const cartIsLoading = ref(false)
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

/**
 * Add the product to the cart
 * @param product_id The id of the product to add to the cart
 * @author Oriol Plazas León
 * @since 31/05/2026
 */
const addProductToCard = async (product_id: number) => {
    try {
        cartIsLoading.value = true;
        errorMsg.value = ''
        cartError.value = false;
        //check if user is logged
        const userData = await userIsLogged();
        if (userData.error) {
            //if user not logged, go to login
            return router.push("/login")
        }
        errorMsg.value = '';
        const data = await postProductIntoCart(product_id);
        if (data.error) {
            throw new Error('cannot add product to cart')
        }
        cartUiStore.openCart();
        cartIsLoading.value = false
    } catch (e: any) {
        cartIsLoading.value = false;
        cartError.value = true;
        errorMsg.value = 'Cannot add product to card' + e.message;
    }
}
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
        <ProductImages v-if="product" class="img-carroussel" :key="product?.id!" :product="product" />
        <article class="text">
            <h1>{{ product?.name }}</h1>
            <p>{{ product?.price }}€</p>
            <hr>
            <p>{{ product?.description }}</p>
            <button v-if="!cartIsLoading" @click="addProductToCard(product?.id!!)" class="addToCart">Add To
                Cart</button>
            <button v-else class="addToCart"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                    viewBox="0 0 24 24">
                    <g fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2">
                        <path stroke-dasharray="18" d="M12 3c4.97 0 9 4.03 9 9">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="18;0" />
                            <animateTransform attributeName="transform" dur="1s" repeatCount="indefinite" type="rotate"
                                values="0 12 12;360 12 12" />
                        </path>
                        <path stroke-dasharray="60"
                            d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                            opacity=".3">
                            <animate fill="freeze" attributeName="stroke-dashoffset" dur="1s" values="60;0" />
                        </path>
                    </g>
                </svg></button>
            <p class="errorMsg" v-if="cartError">{{ errorMsg }}</p>
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

.addToCart {
    font-size: var(--step-0);
    color: var(--white);
    font-family: var(--body-font);
    border: none;
    outline: none;
    background-color: var(--black);
    font-weight: bold;
    padding: 1rem 0rem;
    border-radius: 3px;
    cursor: pointer;
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
