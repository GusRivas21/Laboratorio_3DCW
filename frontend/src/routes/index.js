import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import MainComponent from '../components/MainComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import ServicesComponent from '../components/ServicesComponent.vue'
import AboutUsComponent from '../components/AboutUsComponent.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
    { path: '/', component: MainComponent }, //enlace que se conecta con el routerview de App.vue
    { path: '/inicio', component: MainComponent, name: 'inicio' }, //enlace al componente MainComponent
    { path: '/servicios', component: ServicesComponent, name: 'servicios' }, //enlace al componente ServicesComponent
    { path: '/formulario', component: FormComponent, name: 'form' },  //enlace al componente FormComponent
    { path: '/sobre_nosotros', component: AboutUsComponent, name: 'sobre' }, //enlace al componente AboutUsComponent
    { path: '/login', component: LoginView, name: 'login' }, //enlace al componente LoginView
    { path: '/perfil', component: ProfileView, name: 'perfil' }, //enlace al componente ProfileView
    { path: '/admin', component: AdminDashboard, name: 'admin' },
    { path: '/register', component: RegisterView, name: 'register' },
    { path: '/admin/usuarios', component: () => import('../views/AdminUsersView.vue'), name: 'admin-usuarios' },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Protección de rutas según rol
router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (to.name === 'admin' && (!user || user.role !== 'admin')) {
        return next({ name: 'login' })
    }
    next()
})

export default router
