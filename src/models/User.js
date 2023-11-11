import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  passwordHash: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  pokemonCollection: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Pokemons',
    default: []
  }
})

export default mongoose.model('User', UserSchema)
