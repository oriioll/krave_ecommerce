<script setup lang="ts">
import { getUserCart } from '@/services/cart.fetcher';
import { ref, type Ref } from 'vue';
import type { ProductQuant } from '@/types/ProductQuant.ts';
import type { CartItem } from '@/types/CartItem';
import { getProductById } from '@/services/products.fetcher';
import { userIsLogged } from '@/services/auth.fetcher';
let cartIsOpen: Ref<Boolean> = ref(false);
let error: Ref<Boolean> = ref(false);
let errorMsg: Ref<string> = ref('');
let cartItems: Ref<ProductQuant[]> = ref([])
const handleCart = async () => {
    cartIsOpen.value = !cartIsOpen.value
    document.body.classList.toggle("lessOpacity")
    try {
        const userLogged = await userIsLogged();
        if (userLogged.error || userLogged.loggedIn == false) {
            throw new Error("Log in to add products to your cart!")
        }
        const cartData = await getUserCart();
        if (cartData.error) {
            throw new Error('Cannot get user cart')
        }
        const items = cartData.items;
        if (Array.isArray(items) && items.length < 0) {
            throw new Error('Add products to cart!')
        }
        cartItems.value = []
        items.forEach(async (item: CartItem) => {
            const product = await getProductById(item.product_id)
            cartItems.value.push(product)
        });
    } catch (e: any) {
        error.value = true;
        errorMsg.value = e.message
    }
}

const closeCart = () => {
    cartIsOpen.value = false
}
</script>

<template>
    <header>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
            <path fill="var(--white)"
                d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1" />
        </svg>
        <h1 class="logo-style">
            <router-link to="/home">
                KRAVE
            </router-link>
        </h1>
        <svg @click="handleCart" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
            <path fill="var(--white)"
                d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.99 1.99 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921" />
            <circle cx="10.5" cy="19.5" r="1.5" fill="var(--white)" />
            <circle cx="17.5" cy="19.5" r="1.5" fill="var(--white)" />
        </svg>
        <!--Overlay to blur all the background-->
        <div v-if="cartIsOpen" class="blur-overlay active"></div>
        <div v-if="cartIsOpen" class="shoppingCart">
            <div class="top">
                <svg @click="closeCart" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                    <path fill="var(--black)"
                        d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12L5.293 6.707a1 1 0 0 1 0-1.414" />
                </svg>
                <h3>Cart</h3>
                <div class="auxiliarDiv">
                    <!--Auxiliar div to fill the cart heading-->
                </div>
            </div>
            <article>
                <h5 v-if="error">{{ errorMsg }}</h5>
                <div v-else v-for="p in cartItems">
                    <h5>{{ p.name }}</h5>
                </div>
            </article>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: var(--black);
    width: 100%;
    height: 7svh;
    display: flex;
    gap: 1rem;
    padding: 0 1.25rem;
    justify-content: space-between;
    align-items: center;
    top: 0;
    position: sticky;
    z-index: 1000;
}

svg {
    height: 25px;
    width: 25px;
    transition: all .3s ease;
}

svg:hover {
    cursor: pointer;
}

h1 {
    color: var(--white);
    font-size: var(--step-2);
    font-weight: 600;
}

a {
    color: var(--white);
    text-decoration: none;
}

.shoppingCart {
    /*Full height */
    height: 100dvh;
    overflow-y: scroll;
    /*800px width, but cannot stretch more than the full width of screen */
    width: 800px;
    max-width: 100%;
    background-color: var(--white);
    /*Absolute position besides root element */
    position: absolute;
    top: 0;
    right: 0;
    padding: 1rem;
    z-index: 20;
    transition: all .3s ease;
}

.top {
    display: flex;
    width: 100%;
    gap: 1rem;
    justify-content: space-between;
}

.blur-overlay {
    position: fixed;
    inset: 0;
    backdrop-filter: blur(0px);
    background: rgba(0, 0, 0, 0);
    z-index: 10;
    transition: backdrop-filter 0.3s ease, background 0.3s ease;
}


.blur-overlay.active {
    backdrop-filter: blur(8px);
    background: rgba(0, 0, 0, 0.2);
}


/* --- DESKTOP (1024px+) --- */
@media (min-width: 1024px) {
    header {
        padding: 0 2rem;
    }

    svg {
        height: 35px;
        width: 35px;
    }
}
</style>