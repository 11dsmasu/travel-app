const express = require('express');
const Destination = require('../models/model');

const app = express();

app.use(express.urlencoded({ extended: true}))


app.post('/form', (req, res) => {
  var province = req.body.province
  var town = req.body.town
  var hotels = req.body.hotels
  var sites = req.body.sites
  var festival = req.body.festival
  var leisure = req.body.leisure
  var picture = req.body.picture

  Destination.create({
    province: province,
    town: town,
    hotels: hotels,
    sites: sites,
    festival: festival,
    leisure: leisure,
    picture: picture
  })

  .then(function(place) {
      console.log("ITEM SAVED!")
      console.log(place)
          
      res.send(place)
       })
      
     .catch(function(err) {
       console.log(err)
       res.send(err)         })
})

  app.get('/place', (req, res) => {    
    Destination.find({})      
    .then(function(places) {            
     console.log(places)
     res.send(places)
    })                 
    .catch(function(err) {             
      console.log(err)            
      res.send(err)         
    })
  })

  app.delete('/place/:id', function(req, res) {
      console.log("DELETE ROUTE hit")
      console.log(req.params.id)   
      Destination.findByIdAndDelete(req.params.id)         
      .then(function(x) {             
        console.log(x)             
        res.send(x)         
      })         
      .catch(function(err) {             
        console.log(err)             
        res.send(err)         
      }) 
    })
    
 app.patch('/update/:id', function(req, res) {
     console.log("UPDATE ROUTE hit")
     console.log(req.params.id) 
     var da = {
       province: req.body.province,
       town: req.body.town,
       hotels: req.body.hotels,
       sites: req.body.sites,
       festival: req.body.festival,
       leisure: req.body.leisure,
       picture: req.body.picture
     }  
     Destination.findByIdAndUpdate(req.params.id, da, function(err, place){
       if (err) throw err;

       res.send('Success' + place.province + '&' + place.town)
     }) 

     .then(function(x) {             
        console.log(x)             
        res.send(x)         
     })         
     .catch(function(err) {             
        console.log(err)             
        res.send(err)         
     }) 
  })
 
module.exports = app