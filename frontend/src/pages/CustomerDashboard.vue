<script setup>

import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

</script>

<template>
    <div>
        <HeaderComponent />
        <RouterView />
        <FooterComponent />
    </div>
</template>