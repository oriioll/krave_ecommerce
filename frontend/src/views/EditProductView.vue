<script setup lang="ts">
import ProductImages from '@/components/ProductImages.vue';
import { getProductBySlug } from '@/services/products.fetcher.ts';
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from "vue-router";
import type { Product } from '@/types/Product.ts';
import Navbar from '@/components/Navbar.vue';
import { useProductManagementStore } from '@/stores/productEdition.store';
const product = ref<Product>()
const route = useRoute();
const slug = route.params.slug as string;
const error = ref(false)
const isLoading = ref(false)
const editionStore = useProductManagementStore()
onMounted(async () => {
    try {
        isLoading.value = true
        error.value = false
        const data = await getProductBySlug(slug);
        if (!data) {
            throw new Error("Product not found");
        }
        product.value = data;
        //Set the reactive object form properties to the api return
        Object.assign(form, data);
        isLoading.value = false
    } catch (e: any) {
        isLoading.value = false;
        console.log(e)
        error.value = true;
    }
})
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
const modifyProduct = async () => {

}
const deleteProduct = async () => {
    const id: number = product.value?.id!;
    await editionStore.handleProductDelete(id)
}
</script>

<template>
    <Navbar />
    <!--LOADING STATE-->
    <section v-if="isLoading" class="loading">
        <div class="img-carroussel skeleton"></div>
        <article class="text">
            <div class="skeleton title-skeleton"></div>
            <div class="skeleton price-skeleton"></div>
            <hr>
            <div class="skeleton-group">
                <div class="skeleton line-skeleton"></div>
                <div class="skeleton line-skeleton"></div>
                <div class="skeleton line-skeleton"></div>
            </div>
        </article>
    </section>
    <section v-else-if="!error">
        <ProductImages v-if="product" class="img-carroussel" :key="product?.id!" :product="(form as Product)" />
        <article class="text">
            <input type="text" v-model="form.name" style="font-weight: bold; font-size: var(--step-1);"></input>
            <p>Price (€)</p>
            <input type="number" v-model="form.price" style="font-weight: bold; font-size: var(--step-0);"></input>
            <p>Weight (g)</p>
            <input type="number" v-model="form.weight"></input>
            <hr>
            <textarea rows="3" type="text" v-model="form.description"></textarea>
            <hr>
            <p style="font-weight: bold; margin-bottom: 0.5rem;">Images URLs</p>

            <div class="formRow">
                <div class="formSection">
                    <label for="mainImg">Main *</label>
                    <input id="mainImg" v-model="form.main_image" type="url" placeholder="https://...">
                </div>
                <div class="formSection">
                    <label for="hoverImg">Hover</label>
                    <input id="hoverImg" v-model="form.hover_image" type="url" placeholder="https://...">
                </div>
            </div>

            <div class="formRow">
                <div class="formSection">
                    <label for="aboutImg">About</label>
                    <input id="aboutImg" v-model="form.about_image" type="url" placeholder="https://...">
                </div>
                <div class="formSection">
                    <label for="infoImg">Info</label>
                    <input id="infoImg" v-model="form.info_image" type="url" placeholder="https://...">
                </div>
            </div>
            <hr>
            <!--Buttons-->
            <button v-if="!editionStore.isLoadingEdit" @click="modifyProduct" class="addToCart">Modify</button>
            <button v-else class="addToCart"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
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
            <button v-if="!editionStore.isLoadingDelete" @click="deleteProduct"
                class="addToCart deleteProduct">Delete</button>
            <button v-else class="addToCart"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
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
            <p class="errorMsg" v-if="editionStore.error">{{ editionStore.errorMsg }}</p>
        </article>

    </section>
    <section v-else-if="error">
        <h1>Error</h1>
    </section>
</template>

<style scoped>
/**LOADING SKELETON STYLES */

.skeleton {
    background-color: #f2f2f2;
    /* Gris muy suave */
    position: relative;
    overflow: hidden;
    border-radius: 4px;
}

.skeleton::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%);
    animation: shimmer 1.8s infinite;
    transform: translateX(-100%);
}

.img-carroussel.skeleton {
    aspect-ratio: 3/4;
    height: auto;
}

.title-skeleton {
    height: 2.5rem;
    width: 60%;
}

.price-skeleton {
    height: 1.5rem;
    width: 20%;
}

.line-skeleton {
    height: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
}

.skeleton-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

section {
    width: 100%;
    display: flex;
    flex-direction: column;
    contain: layout style paint;
}

section.loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
}

/**GENERAL STYLES */

.img-carroussel {
    width: 100%;
    height: auto;
}

.text {
    padding: 1rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 40%;
    width: 600px;
    max-width: 100%;
}

p {
    margin: 0;
    font-size: var(--step-0);
}

.formSection {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.formRow {
    display: flex;
    gap: 1rem;
    width: 100%;
}

.formRow>div {
    width: 50%;
}

label {
    font-size: 0.85rem;
    font-weight: bold;
    color: var(--text-muted, #666);
}

.addToCart {
    font-size: var(--step-0);
    color: var(--white);
    font-family: var(--body-font);
    border: none;
    outline: none;
    background-color: var(--black);
    font-weight: bold;
    padding: 1rem 0rem;
    border-radius: 3px;
    cursor: pointer;
}

.deleteProduct {
    background-color: var(--error);
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

@media (min-width: 800px) {
    section {
        flex-direction: row;
        gap: 1rem;
    }

    .img-carroussel {
        width: 45%;
        height: auto;
    }

    .text {
        padding-top: 10rem;
    }


    .price-skeleton {
        height: 1.5rem;
        width: 20%;
    }

    .line-skeleton {
        height: 1rem;
        width: 30vw;
        margin-bottom: 0.5rem;
    }
}
</style>
