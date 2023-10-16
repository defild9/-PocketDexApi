import mongoose from 'mongoose'

const EvolutionSchema = new mongoose.Schema({
  evolution_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pokemon',
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

export default EvolutionSchema
