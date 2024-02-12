const express = require ('express')
const mongoose = require('mongoose')
require('dotenv').config()
const noteRoutes = require ('./routes/notes')
const userRoutes = require ('./routes/user')
// express app
const app = express()

// middleware 
app.use(express.json())

//routes
app.use('/api/notes',noteRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URL)
.then(() => {// listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db listening on port', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})

