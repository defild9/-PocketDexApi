import express from 'express'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import pokemonsRoutes from './src/routes/pokemonsRoutes.js'
import dotenv from 'dotenv'
import './src/data/database.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/pokemons', pokemonsRoutes)

app.listen(4444, (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('Server ok')
})
