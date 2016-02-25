var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginRequestSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
  },
  usr_first_name: String,
  usr_last_name: String,
  usr_email: String,
  usr_username: String,
  usr_password: String
},
{
  collection: 'users'
});

var registerSchema = new Schema({
  usr_first_name: String,
  usr_last_name: String,
  usr_email: String,
  usr_username: String,
  usr_password: String
},
{
  collection: 'users'
});


module.exports = mongoose.model('loginRequest', loginRequestSchema);
module.exports = mongoose.model('register', registerSchema);
