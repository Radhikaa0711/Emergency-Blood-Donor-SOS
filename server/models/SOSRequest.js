const mongoose = require("mongoose");

const sosRequestSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    urgency: {
      type: String,
      required: true
    },

    message: {
      type: String
    },

    status: {
      type: String,
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "SOSRequest",
  sosRequestSchema
);
