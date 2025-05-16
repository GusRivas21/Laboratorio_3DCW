<script setup>
import { getCurrentUser } from '../stores/auth'
import MainComponent from '../components/MainComponent.vue';
const user = getCurrentUser()
</script>

<template>
    <div>
        <p>Hola, {{ user?.name }}</p>

        <button v-if="user?.role === 'admin'">Acción solo para Admin</button>
    </div>
    <MainComponent />
</template>
