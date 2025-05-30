import express from 'express'
import { getProfile, loginUser } from '../controllers/UserController.js'

const router = express.Router()

router.post('/login', loginUser)
router.get('/profile/:id', getProfile)

export default router