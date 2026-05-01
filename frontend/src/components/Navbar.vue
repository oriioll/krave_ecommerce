<script setup lang="ts">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
            <path fill="var(--white)"
                d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.99 1.99 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921" />
            <circle cx="10.5" cy="19.5" r="1.5" fill="var(--white)" />
            <circle cx="17.5" cy="19.5" r="1.5" fill="var(--white)" />
        </svg>
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