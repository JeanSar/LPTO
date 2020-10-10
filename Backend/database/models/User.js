const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        minlength: 3,
        unique : true
    },
    password : {
        type: String,
        required: true,
        minlength: 5
    },
    _roomId : {
        type: mongoose.Types.ObjectId
    },
    inRoom : {
      type : Boolean
    }
});

UserSchema.pre('save', function preSaveCallback(next) {
    var _this = this;
    if(!_this.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function genSaltCallback(err,salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(_this.password, salt, function hashCallback(err,hash) {
        if (err) {
          return next(err);
        }
  
        _this.password = hash;
        next()
      });
    });
  });
  
  UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
  
      cb(isMatch,this);
    });
  };

const User = mongoose.model('User', UserSchema);

module.exports = User;