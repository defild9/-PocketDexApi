import express from 'express'
import { addPokemonToCollection, deleteUser, getMe, removePokemonFromCollection, updateUser } from '../controllers/userController.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

router.get('/me', checkAuth, getMe)
router.delete('/', checkAuth, deleteUser)
router.put('/', checkAuth, updateUser)
router.patch('/addPokemonToCollection', checkAuth, addPokemonToCollection)
router.patch('/removePokemonFromCollection', checkAuth, removePokemonFromCollection)

export default router
