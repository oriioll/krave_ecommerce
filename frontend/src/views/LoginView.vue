<script setup lang="ts">
import { loginUser } from '@/services/auth.fetcher.ts';
import { ref, type Ref } from 'vue';
import OnlyLogoNavbar from '@/components/OnlyLogoNavbar.vue';
import { validateEmail } from '@/util/validators.ts';
import router from '@/router/router';
const error: Ref<boolean> = ref(false)
const errorMsg: Ref<string> = ref('')
const isLoading: Ref<boolean> = ref(false)
const email: Ref<string> = ref('')
const password: Ref<string> = ref('')


/**
 * Handles the login form submit validating the data and logging the user
 * @author Oriol Plazas León
 * @since 30/05/2026
 */
const handleLogin = async () => {
    try {
        //reset aux error variables
        error.value = false;
        isLoading.value = true
        //if there are blank spaces
        if (!email.value.trim() || !password.value.trim()) {
            error.value = true
            errorMsg.value = "Please fill all the fields."
            isLoading.value = false
            return
        }
        const emailIsValid = validateEmail(email.value);
        if (!emailIsValid) {
            //If email format isn't valid
            error.value = true;
            errorMsg.value = 'Please enter a valid email address.'
            isLoading.value = false
            return
        }
        const data = await loginUser(email.value, password.value)
        if (data.error) {
            //If email or password are incorrect
            error.value = true;
            errorMsg.value = 'Invalid email or password.'
            isLoading.value = false
            return
        }
        //if login is successfull
        router.push("/home")
    } catch (e: any) {
        //any other error
        error.value = true;
        errorMsg.value = 'Cannot sign in user, try again.'
        isLoading.value = false
    }
}

</script>

<template>
    <OnlyLogoNavbar />
    <main>
        <article class="headings">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
        </article>
        <form novalidate @submit.prevent="handleLogin">
            <div class="formSection">
                <label for="email">Email address</label>
                <input type="email" name="email" id="name" v-model="email">
            </div>
            <div class="formSection">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" v-model="password">
            </div>
            <p v-if="error" class="error">{{ errorMsg }}</p>
            <button v-if="!isLoading" type="submit" class="submitBtn">Sign In</button>
            <button v-else class="submitBtn"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
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

@media (min-width: 800px) {}
</style>
