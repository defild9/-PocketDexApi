import express from 'express'
import { addEvolution, addPokemon, deletePokemon, getAllPokemons, getPokemon, updatePokemon } from '../controllers/pokemonController.js'

const router = express.Router()

router.get('/', getAllPokemons)
router.get('/:id', getPokemon)
router.post('/', addPokemon)
router.delete('/:id', deletePokemon)
router.put('/:id', updatePokemon)
router.patch('/addEvolution', addEvolution)

export default router
