var mongoose = require('mongoose');
var Schema = mongoose.Schema;

<<<<<<< HEAD
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
=======
var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:  {
        type: String,
        required: true
    },
>>>>>>> a3b3a73ca31da1c47227aca3146c3975f398b8a5
    admin:   {
        type: Boolean,
        default: false
    }
});

<<<<<<< HEAD
User.plugin(passportLocalMongoose);
=======
>>>>>>> a3b3a73ca31da1c47227aca3146c3975f398b8a5
module.exports = mongoose.model('User', User);