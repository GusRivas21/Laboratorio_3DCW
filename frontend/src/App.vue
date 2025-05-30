<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-red-100 via-gray-100 to-red-200">
        <HeaderComponent />
        <RouterView />
        <FooterComponent />
    </div>
</template>