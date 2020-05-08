const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    img:  { data: Buffer },
    last_login: { type: Date, default: Date.now },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    status: String,
    log_count:Number,
    check_blocked: String,
    otp: Number,
    apiaccess:{username:[],
      ApiToken:[]},
    accesstoken:{}
  })
);

module.exports = User;
