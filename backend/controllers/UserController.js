import User from '../models/User.js'

// Controlador para obtener el perfil de un usuario por su ID
export const getProfile = async (req, res) => {
    try {
        // Busca el usuario por su ID y excluye el campo password
        const user = await User.findById(req.params.id).select('-password')
        // Si no se encuentra el usuario, responde con error 404
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        // Si se encuentra, responde con los datos del usuario
        res.json(user)
    } catch (err) {
        // Si ocurre un error, responde con error 500 y el mensaje
        res.status(500).json({ error: err.message })
    }
}

// Controlador para login de usuario
export const loginUser = async (req, res) => {
    try {
        // Muestra en consola los datos recibidos en el login
        console.log('Intentando login con:', req.body)

        // Extrae email y password del cuerpo de la petición
        const { email, password } = req.body
        // Busca el usuario por email en la base de datos
        const user = await User.findOne({ email })

        // Muestra en consola el usuario encontrado (puede ser null)
        console.log("Usuario encontrado:", user)

        // Si no existe el usuario o la contraseña no coincide, responde con error 401
        if (!user || user.password !== password) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' })
        }

        // Elimina el campo password antes de enviar el usuario al frontend
        const { password: _, ...userWithoutPassword } = user._doc
        res.json(userWithoutPassword) // Responde con los datos del usuario (sin password)

    } catch (err) {
        // Si ocurre un error, lo muestra en consola y responde con error 500
        console.error("❌ Error en login:", err)
        res.status(500).json({ error: err.message })
    }
}