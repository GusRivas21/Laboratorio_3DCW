import User from '../models/User.js'

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Controlador para login
export const loginUser = async (req, res) => {
    try {
        console.log('Intentando login con:', req.body)

        const { email, password } = req.body
        const user = await User.findOne({ email })

        console.log("Usuario encontrado:", user)

        if (!user || user.password !== password) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' })
        }

        const { password: _, ...userWithoutPassword } = user._doc
        res.json(userWithoutPassword)

    } catch (err) {
        console.error("❌ Error en login:", err)
        res.status(500).json({ error: err.message })
    }
}

