require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const utilisateurRoute = require('./routes/utilisateurRoute')
const entrepriseRoute = require('./routes/entrepriseRoute')
const actualiteRoutes = require('./routes/actualiteRoute')
const performancesFinanciereRoute = require('./routes/performanceFinanciereRoute')

const cors = require('cors')



//var from .env
const MONGO_URL =process.env.MONGO_URL
const PORT = process.env.PORT


// Middleware for parsing JSON bodies
app.use(express.json())

app.use(cors({origin: 'http://localhost:3000'}))

//routes
app.use('/api/utilisateurs', utilisateurRoute);
app.use('/api/entreprises', entrepriseRoute);
app.use('/api/actualites', actualiteRoutes);
app.use('/api/performance-financiere',performancesFinanciereRoute);


app.get('/', function (req, res) {
  res.send('Hello World')
})



//connect to the data base 
mongoose.set("strictQuery", false)

mongoose.connect(MONGO_URL)
.then(() =>{
    console.log('Connected to MongoDB')
    app.listen(PORT, () =>{
        console.log(`Node API is running on port ${PORT}`)
    })})
.catch((error) => {
    console.error(error)
});