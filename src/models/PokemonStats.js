import mongoose from 'mongoose'

const PokemonStatsSchema = mongoose.Schema({
  hp: {
    type: Number,
    required: true
  },
  attack: {
    type: Number,
    required: true
  },
  defense: {
    type: Number,
    required: true
  },
  specialAttack: {
    type: Number,
    required: true
  },
  specialDefense: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  }
})

export default PokemonStatsSchema
