var express = require('express');
var mongoose = require('mongoose');
var categoryModel = require('../models/categoryModel.js');
var router = express.Router();


/* GET categories. */

router.get('/all/', function(req, res, next) {
  mongoose.model('category').find(function(err, categories){
    res.json(categories);
  });
});
/* GET category by ID. */
router.get('/:id/', function(req, res, next) {
  mongoose.model('category').findById(req.params.id, function(err, categories){
    res.json(categories);
  });
});
module.exports = router;
