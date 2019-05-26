const mongoose = require("mongoose");
const Service = require("../models/Service");

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

exports.add_services = (req, res, next) => {
  const service = new Service({
    name: req.body.name,
    image: req.body.image
  });

  service
    .save()
    .then(result => {
      return res.status(201).json({
        message: "New Service Added",
        name: result.name,
        image: result.image
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: "Internal Error, Please Contact With The Admin"
      });
    });
};
