var express = require('express');
var mongoose = require('mongoose');
var cityModel = require('../models/cityModel.js');
var tokenHelper = require('../helper/auth/token');
var router = express.Router();


/* GET cities. */

router.get('/all/', function(req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];
  tokenHelper.tokenIsValid(token, function(response){
    if (response === true) {
      mongoose.model('city').find(function(err, cities){
        res.json(cities);
      });
    }
    else {
      res.json({success:false, message:'Expired or invalid token'});
    }
  });

});
/* GET city by ID. */
router.get('/:id/', function(req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];
  tokenHelper.tokenIsValid(token, function(response){
    if (response === true) {
      mongoose.model('city').findById(req.params.id, function(err, cities){
        res.json(cities);
      });
    }
    else {
      res.json({success:false, message:'Expired or invalid token'});
    }
  });
});
module.exports = router;
