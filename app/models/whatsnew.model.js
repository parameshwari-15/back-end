const mongoose = require("mongoose");

const Whatnew = mongoose.model(
  "whatsnew",
  new mongoose.Schema({
    data:String
  })
);

module.exports = Whatnew;