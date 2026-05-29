<script setup lang="ts">
import { loginUser, userIsLogged } from '@/services/auth.fetcher.ts';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from "vue-router";
import OnlyLogoNavbar from '@/components/OnlyLogoNavbar.vue';
const route = useRoute();
const error: Ref<boolean> = ref(false)
const errorMsg: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(false)
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')
onMounted(async () => {
    try {
        isLoading.value = true
        error.value = false
        //const data = await getProductBySlug(slug);
        // if (!data) {
        throw new Error("Product not found");
        //}
        isLoading.value = false
    } catch (e: any) {
        isLoading.value = false;
        console.log(e)
        error.value = true;
    }
})
</script>

<template>
    <OnlyLogoNavbar />
    <main>
        <article class="headings">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
        </article>
        <form novalidate>
            <div class="formSection">
                <label for="email">Email address</label>
                <input type="email" name="email" id="name" v-model="email">
            </div>
            <div class="formSection">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" v-model="password">
            </div>
            <p v-if="error" class="error">{{ errorMsg }}</p>
            <button type="submit" class="submitBtn">Sign In</button>
            <p>Don't have an account? <router-link to="/register" class="link">Sign up</router-link></p>
        </form>
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

@media (min-width: 800px) {


    input {
        background-color: transparent;
        border-radius: 3px;
        border: solid 1px var(--black);
        color: var(--black);
        font-size: var(--step-0);
        font-family: var(--body-font);
        outline: none;
        padding: .2rem .25rem;
    }
}
</style>
