const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const Router = require('./route/Routes.js');
const model = require('./models/model')

const app = express();
app.use(express.json()); // Make sure it comes back as json

const upload = multer();

app.use(cors())
app.use(express.urlencoded({ extended: true}))
app.use(upload.array())
app.use(express.json())

mongoose.connect('mongodb+srv://dmasu:dmasu101@cluster0.qjcbm.mongodb.net/database1?retryWrites=true&w=majority', {
   useNewUrlParser: true, useUnifiedTopology: true },
         function(err, database) {
                if (err) { 
                        throw err;
                } 
                console.log("Connection made to database.")
          } )
                    
app.use(Router);


app.listen(3000, () => { console.log('Server is running...') });