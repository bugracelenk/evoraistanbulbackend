const mongoose = require("mongoose");
const Service = require("../models/User");

exports.get_services = (req, res, next) => {
  Service.find()
    .exec()
    .then(services => {
      if (services.length >= 1) {
        return res.status(200).json(services);
      } else {
        return res.status(404).json({
          message: "Nothing Found"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        message: err,
        title: "internal error, please contact with the admin"
      });
    });
};
