var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
  _id: {
    type: Schema.ObjectId,
  },
  city_name: String,
  city_description: String
},
{
  collection: 'city'
});

module.exports = mongoose.model('city', citySchema);
