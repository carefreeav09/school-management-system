const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  grade: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  rollNumber: {
    type: Number,
    required: true,
  },
  achivements: {
    type: [String],
    required: false,
  },
  guardiansInformation: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Guardians",
  },
});

module.exports = mongoose.model("Student", studentSchema);
