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
        const order = new Order(req.body)
        await order.save()
        res.status(201).json(order)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}