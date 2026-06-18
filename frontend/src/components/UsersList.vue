<script setup lang="ts">

import { deleteUserById, getUsers, postUser } from '@/services/users.fetcher';
import type { User } from '@/types/User';
import { ref, onMounted, reactive } from 'vue';
import UsersFilters from './UsersFilters.vue';
const error = ref<boolean>(false)
const errorMsg = ref('')
const users = ref<User[]>([]);
const isLoading = ref(true)
const createUserIsOpen = ref(false)
const deleteLoading = ref(false)
const opsError = ref(false)
onMounted(async () => {
    try {
        isLoading.value = true;
        error.value = false
        const data = await getUsers();
        users.value = data;
        isLoading.value = false;
    } catch (e: any) {
        isLoading.value = false;
        error.value = true
    }

})

/**
 * Orders the reactive array of users based on criteria and order
 * @param criteria The criteria of the order (name, mail or role)
 * @param asc if want to order ascendant or descendant
 */
const handleOrderBy = (criteria: string, asc: boolean) => {
    if (criteria === 'name') {
        if (asc) {
            users.value.sort((a, b) => a.name.localeCompare(b.name))
        } else {
            users.value.sort((a, b) => b.name.localeCompare(a.name))
        }
    } else if (criteria === 'mail') {
        if (asc) {
            users.value.sort((a, b) => a.email.localeCompare(b.email))
        } else {
            users.value.sort((a, b) => b.email.localeCompare(a.email))
        }
    } else if (criteria === 'role') {
        if (asc) {
            users.value.sort((a, b) => a.role!.localeCompare(b.role!))
        } else {
            users.value.sort((a, b) => b.role!.localeCompare(a.role!))
        }
    }
}
/**
 * Deletes the user from db
 * @param user The user to delete
 */
const deleteUser = async (user: User) => {
    try {
        deleteLoading.value = true
        opsError.value = false;
        const success = await deleteUserById(user.id!)
        if (success.error) {
            throw new Error('Cannot delete user API RETURNED ERROR: ' + success.message + success.log)
        }
        //Reset the users list
        const data = await getUsers();
        users.value = data;
    } catch (e: any) {
        opsError.value = true;
        errorMsg.value = 'Cannot delete user ' + user.name
    } finally {
        deleteLoading.value = false
    }
}
/**User creation */
const createError = ref(false)
const createErrorMsg = ref('')
const createIsLoading = ref(false)
let newUser = reactive({
    name: '',
    email: '',
    pwd: '',
    role_id: 1
})
const roles = ref([
    { id: 1, name: 'ADMIN' },
    { id: 2, name: 'CUSTOMER' },
    { id: 3, name: 'STAFF' }
])
const handleOpenCard = () => {
    createUserIsOpen.value = !createUserIsOpen.value
}

const closeCreateUser = () => {
    createUserIsOpen.value = false
}
const handleCreateUser = async () => {
    try {
        createIsLoading.value = true
        createError.value = false
        createErrorMsg.value = ''
        const success = await postUser(newUser)
        if (success.error) throw new Error(success.message)
        // reset form
        newUser = { name: '', email: '', pwd: '', role_id: 1 }
        closeCreateUser()
        // refresca la llista
        const data = await getUsers()
        users.value = data
    } catch (e: any) {
        createError.value = true
        createErrorMsg.value = e.message
    } finally {
        createIsLoading.value = false
    }
}
</script>

<template>
    <div class="mainUsers">
        <!--Overlay to blur all the background-->
        <div v-if="createUserIsOpen" class="blur-overlay active"></div>
        <div v-if="createUserIsOpen" class="shoppingCart">
            <div class="top">
                <svg @click="closeCreateUser" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                    viewBox="0 0 24 24">
                    <path fill="var(--black)"
                        d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12L5.293 6.707a1 1 0 0 1 0-1.414" />
                </svg>
                <h3>Create user</h3>
                <div class="auxiliarDiv">
                    <!--Auxiliar div to fill the cart heading-->
                </div>
            </div>
            <hr>
            <article class="cartProducts">
                <div v-if="createIsLoading" class="loadingCart">
                    <p class="muted">Loading...</p>
                </div>
                <form @submit.prevent="handleCreateUser" class="createUserForm">
                    <div class="field">
                        <label for="name">Name</label>
                        <input id="name" type="text" v-model="newUser.name" placeholder="John Doe" required />
                    </div>

                    <div class="field">
                        <label for="email">Email</label>
                        <input id="email" type="email" v-model="newUser.email" placeholder="john@email.com" required />
                    </div>

                    <div class="field">
                        <label for="pwd">Password</label>
                        <input id="pwd" type="password" v-model="newUser.pwd" placeholder="········" required />
                    </div>

                    <div class="field">
                        <label for="role">Role</label>
                        <select id="role" v-model="newUser.role_id">
                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                {{ role.name }}
                            </option>
                        </select>
                    </div>

                    <p class="errorMsg" v-if="createError">{{ createErrorMsg }}</p>

                    <button type="submit" class="checkoutBtn" :disabled="createIsLoading">
                        <span v-if="!createIsLoading">Create User</span>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <g fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2">
                                <path stroke-dasharray="18" d="M12 3c4.97 0 9 4.03 9 9">
                                    <animateTransform attributeName="transform" dur="1s" repeatCount="indefinite"
                                        type="rotate" values="0 12 12;360 12 12" />
                                </path>
                                <path stroke-dasharray="60"
                                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                                    opacity=".3" />
                            </g>
                        </svg>
                    </button>
                </form>

            </article>
        </div>
        <article class="title">
            <h2>Users</h2>
            <h4 @click="handleOpenCard">+ Add User</h4>
        </article>
        <UsersFilters @change-order="handleOrderBy" />
        <span class="errorMsg" v-if="opsError">{{ errorMsg }}</span>
        <section v-if=isLoading class="usersList loading">
            <div v-for="_ in 5" class="skeleton-row">
                <div class="skeleton-content">
                </div>
            </div>
        </section>

        <section v-else-if="!error && !isLoading" class="usersList">
            <article v-for="user in users" class="user-row">
                <div class="col-info">
                    <h5>{{ user.name }}</h5>
                    <p class="email">{{ user.email }}</p>
                </div>

                <div class="col-role">
                    <p class="role">{{ user.role }}</p>
                </div>

                <div class="col-actions">
                    <button class="btn-edit">Edit</button>
                    <button v-if="!deleteLoading" @click="deleteUser(user)" class="deleteUser">Delete User</button>
                    <button v-else class="deleteUser"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                            viewBox="0 0 24 24">
                            <g fill="none" stroke="var(--white)" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2">
                                <path stroke-dasharray="18" d="M12 3c4.97 0 9 4.03 9 9">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="18;0" />
                                    <animateTransform attributeName="transform" dur="1s" repeatCount="indefinite"
                                        type="rotate" values="0 12 12;360 12 12" />
                                </path>
                                <path stroke-dasharray="60"
                                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
                                    opacity=".3">
                                    <animate fill="freeze" attributeName="stroke-dashoffset" dur="1s" values="60;0" />
                                </path>
                            </g>
                        </svg></button>
                </div>
            </article>
        </section>
        <section v-else class="error">
            <h2>Users not available </h2>
        </section>
    </div>
</template>

<style scoped>
/*CREATE USER MODAL STYLES */
hr {
    width: 80%;
}

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
    z-index: 1000;
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

.top svg {
    cursor: pointer;
}

.cartProducts {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5rem;
}

.checkout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

form button {
    width: 100%;
    padding: .85rem 1rem;
}

.muted {
    color: var(--text-muted);
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

/* CREATE USER FORM STYLES */
.createUserForm {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.field {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    width: 100%;
}

.field label {
    font-size: var(--step--1);
    font-weight: 600;
    text-transform: uppercase;
}

.field input,
.field select {
    width: 600px;
    max-width: 100%;
    padding: 0.75rem;
    font-size: var(--step-0);
}

.errorMsg {
    align-self: center;
}

.checkoutBtn {
    width: 600px;
    max-width: 100%;
    padding: 0.85rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.checkoutBtn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error {
    color: var(--error);
}

@media (min-width: 1000px) {
    .shoppingCart {
        width: 50%;
        /* ← la meitat en desktop */
    }
}

/**OTHER STYLES */
p {
    margin: 0;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title h4 {
    padding: .25rem .75rem;
    cursor: pointer;
}

.mainUsers {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

/*LOADING SKELETON STYLES */

.skeleton-row {
    border: none;
    display: flex;
    gap: .5rem;
    padding: .25rem;
    border-radius: 4px;
}

.skeleton-content {
    height: 2rem;
    width: 100%;
    background-color: #e0e0e0;
    background: linear-gradient(90deg,
            #e0e0e0 0%,
            #f0f0f0 50%,
            #e0e0e0 100%);
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

/**GENERAL STYLES */
.usersList {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.user-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
    padding: .25rem;
    border-radius: 2px;
    border: solid 1px var(--light-gray);
    width: 100%;
}

.col-info {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.col-role {
    flex: 1;
    font-size: var(--step-0);
}

.col-actions {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    justify-content: flex-end;
}

.role {
    text-transform: uppercase;
}

.usersList button {
    padding: .5rem 1.5rem;
    font-weight: 600;
    font-size: var(--step--1);
}

.deleteUser {
    background-color: var(--error);
}

@media (min-width: 800px) {
    .usersList {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}

@media (min-width: 1000px) {
    .usersList button {
        padding: .5rem .5rem;
        font-weight: 600;
        font-size: var(--step-0);
    }

    .mainUsers {
        padding: 2rem;
    }

    .productsGrid {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
}
</style>