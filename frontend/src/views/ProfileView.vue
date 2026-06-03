<script setup lang="ts">
import router from '@/router/router';
import { logoutUser, userIsLogged } from '@/services/auth.fetcher.ts';
import { onMounted, ref, type Ref } from 'vue'
import Navbar from '@/components/Navbar.vue';
import { goToLink } from '@/util/helpers';

const error: Ref<boolean> = ref(false)
const errorMsg: Ref<string> = ref('')
const username: Ref<string> = ref('')
const role: Ref<string> = ref('')
onMounted(async () => {
    try {
        const userData = await userIsLogged();
        if (userData.error) {
            throw new Error('cannot get user data')
        }
        role.value = userData.role
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
    <Navbar />
    <main>
        <h1>Hi, {{ username }}</h1>
        <hr>
        <!--If user isn't a customer, either an admin or staff, that cant manage products-->
        <section class="actionsSection" v-if="role != 'customer'">
            <h2>Quick actions</h2>
            <div class="actions">
                <div @click="goToLink('/create-product')" class="actionCard createProducts">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <g fill="none" stroke="#000000" stroke-linecap="round" stroke-width="1.5">
                            <path stroke-linejoin="round"
                                d="M11 22c-.818 0-1.6-.33-3.163-.99C3.946 19.366 2 18.543 2 17.16V7m9 15V11.355M11 22c.725 0 1.293-.26 2.5-.777M20 7v4" />
                            <path d="M15 17.5h7M18.5 21v-7" />
                            <path stroke-linejoin="round"
                                d="M7.326 9.691L4.405 8.278C2.802 7.502 2 7.114 2 6.5s.802-1.002 2.405-1.778l2.92-1.413C9.13 2.436 10.03 2 11 2s1.871.436 3.674 1.309l2.921 1.413C19.198 5.498 20 5.886 20 6.5s-.802 1.002-2.405 1.778l-2.92 1.413C12.87 10.564 11.97 11 11 11s-1.871-.436-3.674-1.309M5 12l2 1m9-9L6 9" />
                        </g>
                    </svg>
                    <h5><strong>Add Product</strong></h5>
                </div>
                <div @click="goToLink('/manage-products')" class="actionCard manageProducts">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path fill="#000000"
                            d="m7 17.013l4.413-.015l9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583zM18.045 4.458l1.589 1.583l-1.597 1.582l-1.586-1.585zM9 13.417l6.03-5.973l1.586 1.586l-6.029 5.971L9 15.006z" />
                        <path fill="#000000"
                            d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2" />
                    </svg>
                    <h5><strong>Manage Products</strong></h5>
                </div>
                <!--Only if user is an admin can manage users-->
                <div @click="goToLink('/manage-users')" v-if="role == 'admin'" class="actionCard manageUsers">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2m1-17.87a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" />
                    </svg>
                    <h5><strong>Manage Users</strong></h5>
                </div>
            </div>
        </section>
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
    gap: 2.5rem;
    /*CENTER DIV HORIZONTALLY*/
    margin: auto;
    padding: 1rem;
    height: 80svh;
}


button {
    width: 100%;
    padding: .5rem 0rem;
}

.actionsSection {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.actions {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.25rem;
}

.actionCard {
    border: solid 2px var(--black);
    border-radius: 3px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .25rem;
    cursor: pointer;
    transition: all .3s ease;
}

.actionCard svg {
    height: 50px;
    width: 50px;
}

.actionCard:hover {
    transform: translateY(-2px);
    box-shadow: 4px 4px 10px #00000025;
}

.createProducts {
    background-color: var(--bg-createProduct);
}

.manageProducts {
    background-color: var(--bg-manageProduct);
}

.manageUsers {
    background-color: var(--bg-manageUser);
}

.error {
    color: var(--error);
    font-weight: bold;
}


@media (min-width: 800px) {
    .actions {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (min-width: 1000px) {

    .actions {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
}
</style>
