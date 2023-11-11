import UserModel from '../models/User.js'
import PokemonModel from '../models/Pokemon.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.json(userData)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'No access'
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId
    const userPassword = req.body.password

    const user = await UserModel.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isValidPass = await bcrypt.compare(userPassword, user._doc.passwordHash)

    if (!isValidPass) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    user.remove()

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to delete user'
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = req.userId
    const filter = { _id: userId }

    const updates = req.body

    const updateUser = await UserModel.findByIdAndUpdate(filter, updates, { new: true })

    if (!updateUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User updated successfully', user: updateUser })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to update user'
    })
  }
}

export const addPokemonToCollection = async (req, res) => {
  try {
    const userId = req.userId
    const pokemonId = req.body.pokemonId

    const user = await UserModel.findById(userId)
    const pokemon = await PokemonModel.findById(pokemonId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' })
    }

    if (user.pokemonCollection.includes(pokemonId)) {
      return res.status(400).json({ message: 'Pokemon is already in the collection' })
    }

    user.pokemonCollection.push(pokemonId)

    await user.save()

    res.status(200).json({ message: 'Pokemon added to collection successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to add pokemon to collection'
    })
  }
}

export const removePokemonFromCollection = async (req, res) => {
  try {
    const userId = req.userId
    const pokemonId = req.body.pokemonId

    const user = await UserModel.findById(userId)
    const pokemon = await PokemonModel.findById(pokemonId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' })
    }

    if (!user.pokemonCollection.includes(pokemonId)) {
      return res.status(400).json({ message: 'Pokemon is not in the collection' })
    }

    const updatedCollection = user.pokemonCollection.filter(id => id.toString() !== pokemonId.toString())
    await UserModel.findByIdAndUpdate(userId, { $set: { pokemonCollection: updatedCollection } });

    res.status(200).json({ message: 'Pokemon removed from collection successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to add pokemon to collection'
    })
  }
}
