import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import MainComponent from '@/components/MainComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import ServicesComponent from '../components/ServicesComponent.vue'
import AboutUsComponent from '../components/AboutUsComponent.vue'

const routes = [
    { path: '/', component: MainComponent }, //enlace que se conecta con el routerview de App.vue
    { path: '/inicio', component: MainComponent, name: 'inicio' }, //enlace al componente MainComponent
    { path: '/servicios', component: ServicesComponent, name: 'servicios' }, //enlace al componente ServicesComponent
    { path: '/formulario', component: FormComponent, name: 'form' },  //enlace al componente FormComponent
    { path: '/sobre_nosotros', component: AboutUsComponent, name: 'sobre' } //enlace al componente AboutUsComponent
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
