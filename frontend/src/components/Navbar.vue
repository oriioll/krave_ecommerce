<script setup lang="ts">
</script>

<template>
    <header>
        <h1 class="logo-style">
            <router-link to="/home">
                KRAVE
            </router-link>

        </h1>
    </header>
</template>

<style scoped>
header {
    background-color: var(--black);
    width: 100%;
    height: 7svh;
    display: flex;
    gap: 1rem;
    justify-content: space-around;
    align-items: center;
    top: 0;
    position: sticky;
    z-index: 1000;
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
@media (min-width: 1024px) {}
</style>