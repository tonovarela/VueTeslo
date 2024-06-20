<template>
    <!-- Create By Joker Banny -->

    <!-- Header Navbar -->
    <top-menu />
    <!-- Title -->
    <div class="pt-32  bg-white">
        <h1 class="text-center text-2xl font-bold text-gray-800">All Products</h1>
    </div>

    <router-view />

    <custom-footer />




</template>


<script setup lang="ts">
import TopMenu from '../components/TopMenu.vue';
import CustomFooter from '../components/CustomFooter.vue';

</script>