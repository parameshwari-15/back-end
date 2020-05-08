const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.APIRecords = require("./APIRecords.model");
db.user = require("./user.model");
db.role = require("./role.model");
db.menu = require("./menu.model");
db.whatsnew = require("./whatsnew.model")
db.comment = require("./comment.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;