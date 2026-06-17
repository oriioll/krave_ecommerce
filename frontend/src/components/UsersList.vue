<script setup lang="ts">

import { getUsers } from '@/services/users.fetcher';
import type { User } from '@/types/User';
import { ref, onMounted } from 'vue';
import UsersFilters from './UsersFilters.vue';
const error = ref<boolean>(false)
const users = ref<User[]>([]);
const isLoading = ref(true)

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
</script>

<template>
    <div class="mainUsers">
        <h2>Manage the users</h2>
        <UsersFilters @change-order="handleOrderBy" />
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
                    <button class="deleteUser">Delete User</button>
                </div>
            </article>
        </section>
        <section v-else class="error">
            <h2>Users not available </h2>
        </section>
    </div>
</template>

<style scoped>
p {
    margin: 0;
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
    padding: .5rem .5rem;
    font-weight: 600;
    font-size: var(--step-0);
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
    .mainUsers {
        padding: 2rem;
    }

    .productsGrid {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    }
}
</style>