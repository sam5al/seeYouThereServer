var tokenConfig = require ('../../config/token')
var jwt = require('jsonwebtoken');

module.exports = {
  tokenIsValid : function (token, callback) {
    if (token) {
      jwt.verify(token, tokenConfig.secretToken, function(err, decoded) {
        if (err) {
          callback(false);
        } else {
          //console.log(decoded);
          //return decoded;
          callback(true);
        }
      });
    }
    else {
      callback(false);
    }
  }
}
