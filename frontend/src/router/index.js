import { createRouter, createMemoryHistory, createWebHistory } from 'vue-router'
import { getCurrentUser, loginUser, logoutUser } from '../stores/auth'


// Vistas públicas y compartidas
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

// Vistas por rol
import AdminView from '../views/AdminView.vue'
import CustomerView from '../views/CustomerView.vue'

// Componentes individuales
import MainComponent from '../components/MainComponent.vue'
import FormComponent from '../components/FormComponent.vue'
import ServicesComponent from '../components/ServicesComponent.vue'
import AboutUsComponent from '../components/AboutUsComponent.vue'

const routes = [
    { path: '/', name: 'login', component: LoginView },

    // 🌐 Generales (accesibles para todos los roles logueados)
    { path: '/inicio', component: HomeView },
    { path: '/inicio', component: MainComponent, name: 'inicio' },
    { path: '/servicios', component: ServicesComponent, name: 'servicios' },
    { path: '/formulario', component: FormComponent, name: 'form' },
    { path: '/sobre-nosotros', component: AboutUsComponent, name: 'sobre' },

    // 🔐 Rutas protegidas por rol
    { path: '/admin', name: 'admin', component: AdminView, meta: { requiresRole: 'admin' } },
    { path: '/customer', name: 'customer', component: CustomerView, meta: { requiresRole: 'customer' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const user = getCurrentUser()
    const requiredRole = to.meta.requiresRole

    if (!user && to.path !== '/') {
        return next('/')
    }

    if (requiredRole && user?.role !== requiredRole) {
        alert('Acceso no autorizado')
        return next('/')
    }

    next()
})

export default router
