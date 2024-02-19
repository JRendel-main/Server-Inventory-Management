const express = require('express')
const morgan = require('morgan')

const app = express()
const PORT = 8000

// Routes
const itemRoutes = require('./src/v1/routes/itemsRoute')

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1', itemRoutes)

app.listen(PORT, ()=> {
    console.log(`Server Running at port ${PORT}`);
})