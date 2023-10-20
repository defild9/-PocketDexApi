import mongoose from 'mongoose'
import EvolutionSchema from './Evolution.js'
import PokemonStatsSchema from './PokemonStats.js'

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  type: {
    type: [String],
    default: []
  },
  height: {
    type: Number,
    require: true
  },
  weight: {
    type: Number,
    require: true
  },
  abilities: {
    type: [String],
    default: []
  },
  stats: {
    type: PokemonStatsSchema,
    require: true
  },
  evolutions: {
    type: [EvolutionSchema],
    default: []
  },
  description: {
    type: String,
    require: true
  },
  pokemonImage: {
    type: String
  }
})

export default mongoose.model('Pokemon', PokemonSchema)
