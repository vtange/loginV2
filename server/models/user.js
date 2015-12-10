// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

console.log("   MODEL/USER JS")
var User = new Schema({
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);
console.log("   MODEL/USER JS")
module.exports = mongoose.model('users', User);