const mongoose = require("mongoose");

const Menu = mongoose.model(
  "Menu",
  new mongoose.Schema({
    name: String,
    menuitems: [
      {
        type: String
      }
    ],
  })
);

module.exports = Menu;
