<script setup lang="ts">
import router from '@/router/router';
import { logoutUser, userIsLogged } from '@/services/auth.fetcher.ts';
import { onMounted, ref, type Ref } from 'vue'
import OnlyLogoNavbar from '@/components/OnlyLogoNavbar.vue';

const error: Ref<boolean> = ref(false)
const errorMsg: Ref<string> = ref('')
const username: Ref<string> = ref('')
onMounted(async () => {
    try {
        const userData = await userIsLogged();
        if (userData.error) {
            throw new Error('cannot get user data')
        }
        username.value = userData.user.name
    } catch (e: any) {
        error.value = true
        errorMsg.value = 'Cannot get profile info, try again later'
    }

})

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
        <h1>Hi, {{ username }}</h1>

        <div>
            <button @click="handleLogout">LOG OUT</button>
            <p class="errorMsg">{{ errorMsg }}</p>
        </div>

    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 800px;
    max-width: 100%;
    gap: 5rem;
    /*CENTER DIV HORIZONTALLY*/
    margin: auto;
    padding: 1rem;
    height: 80svh;
}


button {
    width: 100%;
    padding: .5rem 0rem;
}



.error {
    color: var(--error);
    font-weight: bold;
}



@media (min-width: 800px) {}
</style>
