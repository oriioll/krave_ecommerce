<script setup lang="ts">
import { useUIStore } from '@/stores/cartUi.store'
const ui = useUIStore()

/**
 * Handles opening/closing the cart
 */
const handleCart = async () => {
    if (ui.isCartOpen) {
        ui.closeCart()
        return
    }
    await ui.openCart()
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
        <div v-if="ui.isCartOpen" class="blur-overlay active"></div>
        <div v-if="ui.isCartOpen" class="shoppingCart">
            <div class="top">
                <svg @click="ui.closeCart" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                    viewBox="0 0 24 24">
                    <path fill="var(--black)"
                        d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12L5.293 6.707a1 1 0 0 1 0-1.414" />
                </svg>
                <h3>Cart</h3>
                <div class="auxiliarDiv">
                    <!--Auxiliar div to fill the cart heading-->
                </div>
            </div>
            <article class="cartProducts">
                <h4 v-if="ui.cartError">{{ ui.cartErrorMsg }}</h4>
                <div v-else-if="ui.isCartLoading" class="loadingCart">
                    <p>Loading cart...</p>
                </div>
                <div v-else-if="ui.cartItems.length === 0" class="emptyCart">
                    <p>Your cart is empty</p>
                </div>
                <div class="cartItem" v-else v-for="p in ui.cartItems">
                    <img class="cartImg" :src="p.main_image!" :alt="p.name">
                    <div class="midCart">
                        <h5>{{ p.name }}</h5>
                        <div class="quantityManager">
                            <svg @click="ui.reduceCartItem(p.id!!, p.quantity)" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-minus">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 12l14 0" />
                            </svg>
                            <p>{{ p.quantity }} </p>
                            <svg @click="ui.increaseCartItem(p.id!!, p.quantity)" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </div>
                    </div>
                    <p><strong>{{ p.price }}€</strong></p>
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

/*CART STYLES */
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

.cartProducts {
    display: flex;
    flex-direction: column;
    gap: .25rem;
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

/*CART ITEM STYLES */

.cartItem {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
}

.cartImg {
    width: 20%;
    height: auto;
    object-fit: cover;
    aspect-ratio: 3/4;
}

.midCart {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.quantityManager {
    max-width: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 2.5rem;
    align-items: center;
    border: solid 1px var(--light-gray);
    padding: .5rem 1rem;
}

.quantityManager p {
    margin: 0;
    font-weight: bold;
}

.quantityManager svg {
    height: 20px;
    width: 20px;
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