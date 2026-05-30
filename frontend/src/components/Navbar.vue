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
/**
 * Handles all the cart system and logic when is open
 */
const handleCart = async () => {
    cartIsOpen.value = !cartIsOpen.value
    document.body.style.overflow = "hidden";
    document.body.classList.toggle("lessOpacity")
    try {
        const userLogged = await userIsLogged();
        //if there isn't any user logged
        if (userLogged.error || userLogged.loggedIn == false) {
            throw new Error("Log in to add products to your cart!")
        }
        const cartData = await getUserCart();
        //if api fails getting the user cart
        if (cartData.error) {
            throw new Error('Cannot get user cart')
        }
        const items = cartData.items;
        //if the cart has 0 items - empty
        if (Array.isArray(items) && items.length < 0) {
            throw new Error('Add products to cart!')
        }
        cartItems.value = []
        items.forEach(async (item: CartItem) => {
            //api returns product_id and quantity - for each product_id, get its full product and push it to a products array
            const product = await getProductById(item.product_id)
            cartItems.value.push({
                quantity: item.quantity,
                //add to the products array the quantity and the product info
                ...product
            })
        });
    } catch (e: any) {
        error.value = true;
        errorMsg.value = e.message
    }
}

const closeCart = () => {
    document.body.style.overflow = "";
    cartIsOpen.value = false
}
</script>

<template>
    <header>
        <aside class="icons icons-left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="var(--white)"
                    d="M4 7a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 5a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1" />
            </svg>
        </aside>

        <h1 class="logo-style">
            <router-link to="/home">
                KRAVE
            </router-link>
        </h1>
        <aside class="icons icons-right">
            <router-link to="/login">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--white)"
                    class="svg icon icon-tabler icons-tabler-filled icon-tabler-user">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                    <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                </svg>
            </router-link>
            <svg @click="handleCart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="var(--white)"
                    d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.99 1.99 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921" />
                <circle cx="10.5" cy="19.5" r="1.5" fill="var(--white)" />
                <circle cx="17.5" cy="19.5" r="1.5" fill="var(--white)" />
            </svg>
        </aside>

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
                <h4 v-if="error">{{ errorMsg }}</h4>
                <div v-else v-for="p in cartItems">
                    <h5>{{ p.name }}</h5>
                    <p>{{ p.quantity }}</p>
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
    padding: 0rem 0.25rem;
    justify-content: center;
    align-items: center;
    top: 0;
    position: sticky;
    z-index: 1000;
    position: relative;
}

.icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    position: absolute;
}

.icons-left {
    left: 0.25rem;
}

.icons-right {
    right: 0.25rem;
}

.logo-style {
    flex: 0 0 auto;
    text-align: center;
}

svg,
.svg {
    height: 20px;
    width: 20px;
    transition: all .3s ease;
}

svg:hover {
    cursor: pointer;
}

.top svg {
    height: 24px;
    width: 24px;
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
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

    svg,
    .svg {
        height: 28px;
        width: 28px;
    }

    .top svg {
        height: 28px;
        width: 28px;
    }
}
</style>