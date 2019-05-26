const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.user_signup = (req, res, next) => {
  User.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Given email is exist'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            let userId = new mongoose.Types.ObjectId();
            const user = new User({
              _id: userId,
              email: req.body.email,
              password: hash,
              userName: req.body.username,
            });
            user
              .save()
              .then(result => {
                return res.status(201).json({
                  msg: "Created"
                })
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
}

exports.user_login = (req, res, next) => {
  User.find({
      email: req.body.email
    }).exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth Failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth Failed'
          })
        }
        if (result) {
          const token = jwt.sign({
            _id: user[0]._id,
            userName: user[0].userName,
          }, "secret", {
            expiresIn: '1h'
          });
          return res.status(200).json({
            message: 'Auth Sucessful',
            token: token
          });
        }
        return res.status(401).json({
          message: 'Auth Failed'
        })
      })
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        message: 'Internal Error (500)'
      })
    })
}
