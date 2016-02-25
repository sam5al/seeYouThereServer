var express = require('express');
var mongoose = require('mongoose');
var loginRequestModel = require('../models/loginRequestModel');
var bcrypt = require('bcrypt-nodejs');
var jwt    = require('jsonwebtoken');
var tokenConfig = require ('../config/token');
var router = express.Router();

/* GET auth. */
router.post('/auth', function(req, res, next) {
    console.log(req.body.username);
    mongoose.model('loginRequest')
    .find({$or:[{'usr_email': req.body.username}, {'usr_username': req.body.username}]})
    .limit(1)
    .exec(function(err, user){
      var returnedObject ={};
      if (!err) {
        if (isEmptyObject(user) || bcrypt.compareSync(req.body.password, user[0].usr_password) === false){
          returnedObject.success = false;
          returnedObject.message = 'Please enter a valid username/password';
        }
        else if (bcrypt.compareSync(req.body.password, user[0].usr_password) === true) {
          returnedObject.success = true;
          returnedObject._id = user[0]._id;
          returnedObject.message = 'Authentication succesful!';
          returnedObject.token = jwt.sign({usr_email: user[0].usr_email, usr_username: user[0].usr_username}, tokenConfig.secretToken, {
            expiresIn: 1440 * 60 // expires in 24 hours
          });
        }
      }
      else {
        returnedObject.success = false;
        returnedObject.message = 'Please retry to connect!';
      }
      res.json(returnedObject);
    });
});

router.post('/register', function(req, res, next){
  var User = mongoose.model('register');
  var password = bcrypt.hashSync(req.body.password);
  var newUser = new User({
    usr_first_name: req.body.firstName,
    usr_last_name : req.body.lastName,
    usr_email     : req.body.email,
    usr_username  : req.body.username,
    usr_password  : password
  });

  newUser.save(function (err, data) {
    if (err) res.send({
                      success: false,
                      message: err
                    });
    else res.json({
          success: true,
          message: 'Enjoy your token!',
          token:  jwt.sign({usr_email: req.body.email, usr_username: req.body.username}, tokenConfig.secretToken, {
                      expiresIn: 1440 * 60 // expires in 24 hours
                    })
        });
  });

});

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

module.exports = router;
