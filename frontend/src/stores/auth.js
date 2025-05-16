// Guardar usuario
export function loginUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

// Cargar usuario
export function getCurrentUser() {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
}

// Cerrar sesión
export function logoutUser() {
    localStorage.removeItem('user')
}
