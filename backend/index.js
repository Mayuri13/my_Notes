// const connectToMongo = require('./db')
// connectToMongo()
const express = require('express')
const mongoose = require('mongoose');
require('dotenv/config')

var cors = require('cors')

const app = express()
const port = process.env.PORT
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello Harry!')
})

mongoose.connect(process.env.MONGODB_CONNECT_URI)
.then(()=>console.log('DB Connected!'))
.catch((error)=>console.log(error))

//To print req.body in console
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})