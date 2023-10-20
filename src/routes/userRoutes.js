import express from 'express'
import { addPokemonToCollection, deleteUser, getMe, updateUser } from '../controllers/userController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

router.get('/me', checkAuth, getMe)
router.delete('/', checkAuth, deleteUser)
router.put('/', checkAuth, updateUser)
router.patch('/addPokemonToCollection', checkAuth, addPokemonToCollection)

export default router
