const express = require('express')
const  dotenv = require('dotenv').config()
const port = process.env.PORT || 4000

const app = express()

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

// Enabling body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port,()=>console.log(`Server started on port ${port}`))