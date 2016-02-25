var express = require('express');
var mongoose = require('mongoose');
var eventModel = require('../models/eventModel.js');
var tokenHelper = require('../helper/auth/token');
var router = express.Router();


/* GET events. */
router.get('/all/', function(req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];
  tokenHelper.tokenIsValid(token, function(response){
    if (response === true) {
      mongoose.model('event').find()
                             .populate('event_category_id')
                             .populate('event_city_id')
                             .exec(function(err, events){
                               res.json(events);
                             });
    }
    else {
      res.json({success:false, message:'Expired or invalid token'});
    }
  });

});
/* GET event by ID. */
router.get('/:id/', function(req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];
  tokenHelper.tokenIsValid(token, function(response){
    if (response === true) {
      mongoose.model('event').findById(req.params.id)
                             .populate('event_category_id')
                             .populate('event_city_id')
                             .exec(function(err, events){
                               res.json(events);
                             });
    }
    else {
      res.json({success:false, message:'Expired or invalid token'});
    }
  });

});
router.get('/search/:name', function (req, res, next){
  var token = req.body.token || req.headers['x-access-token'];
  tokenHelper.tokenIsValid(token, function(response){
    if (response === true) {
      mongoose.model('event').find({"event_name": {"$regex": req.params.name,"$options":'i'}})
                             .populate('event_category_id')
                             .populate('event_city_id')
                             .exec (function(err,events){
                               res.json(events);
                             });
    }
    else {
      res.json({success:false, message:'Expired or invalid token'});
    }
  });

});

module.exports = router;
