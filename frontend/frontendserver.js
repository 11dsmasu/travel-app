const express= require('express')

const mongoose = require('mongoose')
const app = express();

const cors = require('cors')
const multer = require('multer')
const path = require('path')

app.use(express.json()); // Make sure it comes back as json

const upload = multer();

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(upload.array())

app.use(express.static('public')) 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(8080, () => { console.log('Server is running...') });