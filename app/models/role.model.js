const mongoose = require("mongoose");

const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    menu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu"
      }
    ],
  })
);

module.exports = Role;
