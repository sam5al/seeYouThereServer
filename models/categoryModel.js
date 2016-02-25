var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  _id: {
    type: Schema.ObjectId,
  },
  cat_name: String
},
{
  collection: 'category'
});

module.exports = mongoose.model('category', categorySchema);
