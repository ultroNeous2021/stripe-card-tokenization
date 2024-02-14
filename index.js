require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes/routes')

const PORT = process.env.PORT || 3000
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', error => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})

const app = express()

app.use(express.json())
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})
