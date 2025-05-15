<script setup>
import {ref} from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import HomeView from './views/HomeView.vue';
</script>

<template>
    <HeaderComponent />
    <RouterView />
    <FooterComponent />
</template>

<style scoped>

</style>
