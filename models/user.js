const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  passord: String
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema)

module.exports = () => {
  return User
}
