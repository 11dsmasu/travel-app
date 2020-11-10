const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
  province: {
    type: String,
    trim: true,
    lowercase: true
  },
  town: {
    type: String,
    trim: true,
    lowercase: true
  },
  hotels: {
    type: String,
    trim: true,
    lowercase: true
  },
  sites: {
    type: String,
    trim: true,
    lowercase: true
  },
  festival: {
    type: String,
    trim: true,
    lowercase: true
  },
  leisure: {
    type: String,
    trim: true,
    lowercase: true
  },
  picture: {
    type: String
  }
});

const Destination = mongoose.model("Destination", DestinationSchema);
module.exports = Destination;