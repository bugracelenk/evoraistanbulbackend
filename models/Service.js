const mongoose = require("mongoose");

const Service = mongoose.Model(
  "Service",
  new mongoose.Schema({
    name: String,
    image: String
  })
);

module.exports = Service;
