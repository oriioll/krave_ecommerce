<script setup lang="ts">
import { reactive } from 'vue';
import OnlyLogoNavbar from '@/components/OnlyLogoNavbar.vue';
import { useProductStore } from '@/stores/productCreation.store';
const productStore = useProductStore()
/* FORM REACTIVE VARIABLES */
const form = reactive({
    id: null,
    name: '',
    description: '',
    price: 0,
    main_image: '',
    hover_image: '',
    about_image: '',
    info_image: '',
    weight: 0,
    slug: ''
})

const handleCreationProduct = async () => {
    form.slug = form.name.split('').join('-')
    await productStore.handleCreateProduct(form)
}
</script>

<template>
    <OnlyLogoNavbar />
    <main>
        <article class="headings">
            <h1>Add a Product</h1>
            <p>Please add all the data of the product</p>
        </article>
        <form @submit.prevent="handleCreationProduct()">
            <div class="formSection">
                <label for="">Name *</label>
                <input v-model="form.name" type="text">
            </div>
            <div class="formSection">
                <label for="">Description *</label>
                <input v-model="form.description" type="text">
            </div>
            <div class="formRow">
                <div class="formSection">
                    <label for="">Price *</label>
                    <input v-model="form.price" type="number">
                </div>
                <div class="formSection">
                    <label for="">Weight (g) *</label>
                    <input v-model="form.weight" type="number">
                </div>
            </div>
            <div class="sectionSpace"></div>
            <div class="formRow">
                <div class="formSection">
                    <label for="">Main image (url) *</label>
                    <input v-model="form.main_image" type="url">
                </div>
                <div class="formSection">
                    <label for="">Secondary image (url) </label>
                    <input v-model="form.hover_image" type="url">
                </div>
            </div>
            <div class="formRow">
                <div class="formSection">
                    <label for="">About image (url)</label>
                    <input v-model="form.about_image" type="url">
                </div>
                <div class="formSection">
                    <label for="">Info image (url) </label>
                    <input v-model="form.info_image" type="url">
                </div>
            </div>
            <button type="submit"> Add product</button>
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

.formRow {
    display: flex;
    gap: .5rem;
}

.formRow div {
    width: 50%;
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
