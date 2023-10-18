import mongoose from 'mongoose'
import 'dotenv/config'

const dbURL = process.env.DATABASE_ULR

mongoose.connect(dbURL)

const db = mongoose.connection

db.on('connected', () => {
  console.log('Connected to database')
})

db.on('error', (err) => {
  console.error(`Connection error: ${err}`)
})

db.on('disconnected', () => {
  console.log('Database disconnected')
})

export default db
