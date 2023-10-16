import express from 'express'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import pokemonsRoutes from './routes/pokemonsRoutes.js'

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
