import Order from '../models/Order.js'

// Obtener todos los pedidos y reservaciones
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 })
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Crear un nuevo pedido o reserva
export const createOrder = async (req, res) => {
    try {
        console.log('Pedido recibido:', req.body)
        const order = new Order(req.body)
        await order.save()
        res.status(201).json(order)
    } catch (err) {
        console.error('Error al crear pedido:', err.message)
        res.status(400).json({ error: err.message, body: req.body })
    }
}

// Editar pedido
export const updateOrder = async (req, res) => {
    try {
        const { tipo, nombre, detalle, fecha, estado } = req.body
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { tipo, nombre, detalle, fecha, estado },
            { new: true, runValidators: true }
        )
        if (!order) return res.status(404).json({ error: 'Pedido no encontrado' })
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Eliminar pedido
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if (!order) return res.status(404).json({ error: 'Pedido no encontrado' })
        res.json({ mensaje: 'Pedido eliminado correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}