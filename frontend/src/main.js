import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

//Importando Toastification y sus estilos
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
}

createApp(App).use(Toast, options).use(router).mount('#app')
