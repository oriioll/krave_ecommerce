<script setup lang="ts">
</script>

<template>
    <section class="hero">
        <h2>DARK</h2>
        <h2>ESSENCE</h2>
    </section>
</template>

<style scoped>
.hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 70svh;
    background-color: var(--white);
    overflow: hidden;
}

h2 {
    font-family: var(--logo-font);
    font-weight: 900;
    text-transform: uppercase;
    color: var(--black);
    font-size: clamp(5rem, 8vw, 12rem);
    line-height: 0.8;
    letter-spacing: -0.05em;
    pointer-events: none;
    z-index: 1;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}


/* --- DESKTOP (1024px+) --- */
@media (min-width: 1024px) {
    .hero {
        flex-direction: row;
        gap: 30vw;
    }
}
</style>