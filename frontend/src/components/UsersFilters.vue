<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits<{
    (e: 'change-order', criteria: string, asc: boolean): void
}>()

const roleAsc = ref(false)
const nameAsc = ref(false)
const mailAsc = ref(false)
</script>

<template>
    <div class="filters">
        <button @click="emit('change-order', 'name', !nameAsc), nameAsc = !nameAsc">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <path fill="none" stroke="var(--black)" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="1.5" d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8" />
            </svg>
            Name
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="var(--black)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m7 15l5 5l5-5M7 9l5-5l5 5" />
            </svg>
        </button>
        <button @click="emit('change-order', 'mail', !mailAsc), mailAsc = !mailAsc">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <g fill="none" stroke="var(--black)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                </g>
            </svg>
            Mail
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="var(--black)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m7 15l5 5l5-5M7 9l5-5l5 5" />
            </svg>
        </button>
        <button @click="emit('change-order', 'role', !roleAsc), roleAsc = !roleAsc">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
                <path fill="var(--black)"
                    d="M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3M9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z" />
            </svg>
            Role
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="var(--black)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m7 15l5 5l5-5M7 9l5-5l5 5" />
            </svg>
        </button>
    </div>
</template>

<style scoped>
.filters {
    width: 100%;
    display: flex;
    gap: 5rem;
    justify-content: flex-start;
    align-items: center;
}

button {
    background-color: transparent;
    color: var(--black);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .25rem;
}

@media (min-width: 800px) {}

@media (min-width: 1000px) {}
</style>