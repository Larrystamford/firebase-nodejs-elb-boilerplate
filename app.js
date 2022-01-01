const express = require('express')
const cors = require('cors')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
app.use(express.json())
app.use(cors())

app.use('/v1/users', require('./routes/users'))

app.listen(5000, () => console.log('Running on port 5000'))
