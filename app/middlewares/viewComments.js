const db = require("../models");
const Comment = db.comment;

displayComment = (req, res, next) => {
    // Username
    Comment.find({
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
        next();
      });
  };
  