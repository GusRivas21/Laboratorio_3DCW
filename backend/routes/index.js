import express from 'express'
import { getProfile, loginUser, registerUser, getAllUsers } from '../controllers/UserController.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/profile/:id', getProfile)
router.get('/', getAllUsers)

export default router