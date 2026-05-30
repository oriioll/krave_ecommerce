<script setup lang="ts">
import router from '@/router/router';
import { logoutUser } from '@/services/auth.fetcher.ts';
import { ref, type Ref } from 'vue'
const errorMsg: Ref<String> = ref('')
const handleLogout = async () => {
    const data = await logoutUser();
    if (data.error) {
        errorMsg.value = data.message
    } else {
        router.push("/home")
    }
}
</script>

<template>
    <OnlyLogoNavbar />
    <main>
        <button @click="handleLogout">LOG OUT</button>
        <p class="errorMsg">{{ errorMsg }}</p>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 800px;
    max-width: 100%;
    gap: .25rem;
    /*CENTER DIV HORIZONTALLY*/
    margin: auto;
    padding: 1rem;
    height: 80svh;
}

.headings {
    display: flex;
    flex-direction: column;
    gap: .25rem;
}

.headings p {
    color: var(--text-muted);
}

form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.formSection {
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

label {
    margin: 0;
    padding: 0;
    font-weight: bold;
}

button {
    padding: .5rem 0rem;
}

a,
.link {
    color: var(--accent-color)
}

.error {
    color: var(--error);
    font-weight: bold;
}

p,
label,
input {
    font-size: var(--step-0);
}

@media (min-width: 800px) {}
</style>
