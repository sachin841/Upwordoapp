const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  name: {
    type: String
  },

  otp: {
    type: Number
  },
  otp_expire: {
    type: Date
  },
  salt: {
    type: String
  },
  password: {
    type: String,

  }
  ,

  isadmin: {
    type: String,
    default: "user"
  },
  verified: {
    type: Boolean
  }



}, {
  timestamps: true
});

const Usermodel = mongoose.model('User', userSchema);


module.exports = Usermodel;
