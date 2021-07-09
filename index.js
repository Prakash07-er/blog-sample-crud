require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const foodRoute =require('./Routers/foodRoute')
const upload =require('./Routers/upload')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

//local server connection
const PORT = process.env.PORT || 5000

// mongodb connection
const URI = process.env.MONGO_URL
mongoose.connect(URI, {
    useCreateIndex:true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err ;
    console.log("::: Successfully Connected to MongoDB Server :::")
})

app.use('/', foodRoute)
app.use('/', upload)

app.listen(PORT, () => {
    console.log("::: Your Server Running on PORT", PORT)
})