const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')


//Import Routes

const blogRoute = require('./routes/blog')


//setting up the body parser
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}))


app.use(cors())


//Creating middlewares

app.use('/blog', blogRoute)

const PORT = process.env.PORT || 8080

//CONNECTING TO MONGOOSE
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology:true })
.then(()=> app.listen(PORT, ()=>{
  console.log('Server is up and running')
}))
.catch((error)=>console.log(error))

mongoose.set(`strictQuery`, false)
