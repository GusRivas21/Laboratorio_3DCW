import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    tipo: { type: String, enum: ['Pedido', 'Reserva'], required: true },
    nombre: { type: String, required: true },
    detalle: { type: String, required: true },
    fecha: { type: String, required: true },
    estado: { type: String, default: 'Pendiente' }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)