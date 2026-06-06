<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import ProductsMain from '@/components/ProductsMain.vue';
const EDIT_MODE: boolean = true
</script>

<template>
    <Navbar class="nav" />
    <ProductsMain :editMode="EDIT_MODE" />
</template>

<style scoped></style>
