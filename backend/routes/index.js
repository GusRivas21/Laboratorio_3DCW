import express from 'express'
import { getProfile, loginUser, registerUser, getAllUsers, updateUser, deleteUser } from '../controllers/UserController.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/profile/:id', getProfile)
router.get('/', getAllUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router