const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  bloodGroup: {
    type: String,
    required: true
  },

  locality: {
    type: String,
    required: true
  },

  available: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Donor", donorSchema);
