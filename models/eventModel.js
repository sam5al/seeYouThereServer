var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
  },
  event_name: String,
  event_category_id: {
        type: Schema.ObjectId,
        ref: 'category'
      },
  event_city_id: {
        type: Schema.ObjectId,
        ref: 'city'
      }
},
{
  collection: 'event'
});

module.exports = mongoose.model('event', eventSchema);
