const mongoose = require("mongoose");
const { stringify } = require("uuid");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  roles: {
    type: [String],
    default: ["student"],
    required: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: "https://i.pravatar.cc/300",
    required: false,
  },
  hasChangedPasswords: {
    type: Boolean,
    default: false,
  },
  studentInformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("User", userSchema);
