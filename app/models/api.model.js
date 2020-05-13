const mongoose = require("mongoose");

const Comment = mongoose.model(
  "apirecords",
  new mongoose.Schema({
    CreatedBy = String,
    description=String,
    Version=String,
    Swagger = String,
    Link = String,
    Request=String,
    apiname = String,
    dateCreated=String,
    access=String
  })
);

module.exports = Api;