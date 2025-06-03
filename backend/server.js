import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/index.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err.message))


const app = express()

// ✅ CORS BIEN CONFIGURADO
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

// ✅ Permitir JSON
app.use(express.json())

// ✅ Rutas
app.use('/api/users', userRoutes)

// Ruta base
app.get('/', (req, res) => {
    res.send('¡Backend funcionando!')
})

// ✅ Puerto
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

console.log('MONGO_URI:', process.env.MONGO_URI)
