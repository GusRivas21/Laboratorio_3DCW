import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import MainComponent from '../components/MainComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import ServicesComponent from '../components/ServicesComponent.vue'
import AboutUsComponent from '../components/AboutUsComponent.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
    { path: '/', component: MainComponent }, //enlace que se conecta con el routerview de App.vue
    { path: '/inicio', component: MainComponent, name: 'inicio' }, //enlace al componente MainComponent
    { path: '/servicios', component: ServicesComponent, name: 'servicios' }, //enlace al componente ServicesComponent
    { path: '/formulario', component: FormComponent, name: 'form' },  //enlace al componente FormComponent
    { path: '/sobre_nosotros', component: AboutUsComponent, name: 'sobre' }, //enlace al componente AboutUsComponent
    { path: '/login', component: LoginView, name: 'login' }, //enlace al componente LoginView
    { path: '/perfil', component: ProfileView, name: 'perfil' }, //enlace al componente ProfileView
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
