import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
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

export default mongoose.Model('User', UserShema)
