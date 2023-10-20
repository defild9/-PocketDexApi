import PokemonModel from '../models/Pokemon.js'

export const getAllPokemons = async (req, res) => {
  try {
    const pokemons = await PokemonModel.find().populate('evolutions').exec()
    res.json({
      pokemons
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to get pokemon'
    })
  }
}

export const getPokemon = async (req, res) => {
  try {
    const pokemonId = req.params.id

    const pokemon = await PokemonModel.findById(pokemonId).populate('evolutions').exec()

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' })
    }

    res.json({ pokemon })
  } catch (error) {

  }
}

export const addEvolution = async (req, res) => {
  try {
    const { pokemonId, evolutionId } = req.body

    const pokemon = await PokemonModel.findById(pokemonId)

    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' })
    }

    const evolutionPokemon = await PokemonModel.findById(evolutionId)

    if (!evolutionPokemon) {
      return res.status(404).json({ message: 'Evolution pokemon not found' })
    }

    const newEvolution = {
      evolution_id: evolutionId,
      name: evolutionPokemon.name
    }

    pokemon.evolutions.push(newEvolution)

    await pokemon.save()

    res.status(200).json({ message: 'Evolution added successfully', pokemon })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to add evolution'
    })
  }
}

export const addPokemon = async (req, res) => {
  try {
    const { name, type, height, weight, abilities, stats, description, pokemonImage } = req.body

    const newPokemon = new PokemonModel({
      name,
      type,
      height,
      weight,
      abilities,
      stats,
      description,
      pokemonImage
    })

    await newPokemon.save()

    res.status(200).json({ message: 'Pokemon added successfully', pokemon: newPokemon })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to add pokemon' })
  }
}

export const deletePokemon = async (req, res) => {
  try {
    const pokemonId = req.params.id

    const deletedPokemon = await PokemonModel.findByIdAndRemove(pokemonId)

    if (!deletedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' })
    }

    res.status(200).json({ message: 'Pokemon deleted successfully', pokemon: deletedPokemon })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete pokemon' })
  }
}

export const updatePokemon = async (req, res) => {
  try {
    const pokemonId = req.params.id

    const filter = { _id: pokemonId }
    const updates = req.body

    const updatedPokemon = await PokemonModel.findOneAndUpdate(filter, updates, { new: true })

    if (!updatedPokemon) {
      return res.status(404).json({ message: 'Pokemon not found' })
    }

    res.status(200).json({ message: 'Pokemon updated successfully', pokemon: updatedPokemon })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update pokemon' })
  }
}
