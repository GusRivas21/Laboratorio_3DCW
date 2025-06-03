import express from 'express'
import { getProfile, loginUser, registerUser } from '../controllers/UserController.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/profile/:id', getProfile)

export default router