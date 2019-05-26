const mongoose = require("mongoose");

const Service = mongoose.Model(
  "Service",
  new mongoose.Schema({
    serviceName: String,
    image: String
  })
);

module.exports = Service;