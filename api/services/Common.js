var async = require("async");
var bcrypt = require("bcrypt");

module.exports.decodeBase64Image = function(data, callback) {
    var dataString = ''+data
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};
    if (matches.length !== 3) return new Error('Invalid input string');
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    callback(null, response);
};

