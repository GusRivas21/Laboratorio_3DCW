import bcrypt from 'bcryptjs'
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
        console.log('Intentando login con:', req.body)
        const { email, password } = req.body
        const user = await User.findOne({ email })
        console.log("Usuario encontrado:", user)
        // Si no existe el usuario o la contraseña no coincide, responde con error 401
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' })
        }
        // Elimina el campo password antes de enviar el usuario al frontend
        const { password: _, ...userWithoutPassword } = user._doc
        res.json(userWithoutPassword)
    } catch (err) {
        console.error("❌ Error en login:", err)
        res.status(500).json({ error: err.message })
    }
}

// Controlador para registrar usuario (ejemplo)
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedPassword, role })
        await user.save()
        const { password: _, ...userWithoutPassword } = user._doc
        res.status(201).json(userWithoutPassword)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Obtener todos los usuarios (solo para admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Editar usuario (solo admin)
export const updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true, runValidators: true, select: '-password' }
        )
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Eliminar usuario (solo admin)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json({ mensaje: 'Usuario eliminado correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}