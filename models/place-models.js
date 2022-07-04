const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Place', placeSchema);
