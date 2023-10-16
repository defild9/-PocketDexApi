import mongoose from 'mongoose'
import EvolutionSchema from './Evolution'
import PokemonStatsShema from './PokemonStats'

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
    type: PokemonStatsShema,
    require: true
  },
  evolutions: {
    type: [EvolutionSchema],
    default: []
  },
  description: {
    type: String,
    require: true
  }
})

export default mongoose.model('Pokemon', PokemonSchema)
