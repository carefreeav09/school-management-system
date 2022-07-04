const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GuardiansModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Guardians", GuardiansModel);
