import express from 'express'
import ServiceModel from '../models/Service.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const { categoria } = req.query
    let query = {}
    if (categoria) query.categoria = categoria
    const productos = await ServiceModel.find(query)
    res.json(productos)
})

export default router