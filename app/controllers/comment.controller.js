const config = require("../config/auth.config");
const dbconfig = require("../config/db.config");
const db = require("../models");
const User= db.user;
const Comment = db.comment;

exports.test = (req, res) => {
    res.status(200).send("testing comment");
  };

exports.view = (req, res) => {
  // res.status(200).send("it works");
    Comment.find({
      // title: req.body.title
    })
      .exec((err, comment) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!comment) {
          return res.status(404).send({ message: "No comments found." });
        }
console.log(comment)
        res.status(200).send({
            comment:comment
        });
  
        // res.status(200).send({
        //   id: user._id,
        //   username: user.username,
        //   email: user.email,
        //   roles: authorities,
        //   accessToken: token
        // });
      });
  };

  exports.insert = (req, res) => {
    var comment = new Comment({
      title: req.body.title,
      comment: req.body.comment,
      uid:req.body.uid,
      archived:false,
      uname:req.body.uname
      
    });
  console.log(comment)
  console.log(req.body.uname)
    comment.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "Comment was inserted successfully!" });
    });
  }


  exports.delete = (req, res) => {
    // res.status(200).send("it works");
      Comment.findByIdAndRemove({_id: req.body.id},function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
    
          // res.status(200).send({
          //   id: user._id,
          //   username: user.username,
          //   email: user.email,
          //   roles: authorities,
          //   accessToken: token
          // });
        
    };

    exports.count = (req, res) => {
      // res.status(200).send("it works");
        Comment.find({
          title: req.body.title
        })
          .exec((err, comment) => {
              
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
      
            if (!comment) {
              return res.status(404).send({ message: "No comments found." });
            }
    
            res.status(200).send({
                length:comment.length
            });
      
            // res.status(200).send({
            //   id: user._id,
            //   username: user.username,
            //   email: user.email,
            //   roles: authorities,
            //   accessToken: token
            // });
          });
      };
      exports.search = (req, res) => {
        // res.status(200).send("it works");
          Comment.find({
            // title: req.body.title
          })
            .exec((err, comment) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
        
              if (!comment) {
                return res.status(404).send({ message: "No comments found." });
              }
      
              res.status(200).send({
                  length:comment.length
              });
        
              // res.status(200).send({
              //   id: user._id,
              //   username: user.username,
              //   email: user.email,
              //   roles: authorities,
              //   accessToken: token
              // });
            });
        };
      

    exports.update = (req, res) => {
      // res.status(200).send("it works");
      //   Comment.findByIdAndRemove({_id: req.body.id},function(err){
      //     if(err) res.json(err);
      //     else res.json('Successfully removed');
      // });
        Comment.findByIdAndUpdate({_id: req.body.id},{comment:req.body.comment},function(err){
          if(err) res.json(err);
          else res.json('Successfully updated');
      });
      
            // res.status(200).send({
            //   id: user._id,
            //   username: user.username,
            //   email: user.email,
            //   roles: authorities,
            //   accessToken: token
            // });
          
      };
      exports.archive = (req, res) => {
        // res.status(200).send("it works");
        //   Comment.findByIdAndRemove({_id: req.body.id},function(err){
        //     if(err) res.json(err);
        //     else res.json('Successfully removed');
        // });
          Comment.updateMany({uid: req.body.id},{archived:true},function(err){
            if(err) res.json(err);
            else res.json('Successfully updated');
        });
        
              // res.status(200).send({
              //   id: user._id,
              //   username: user.username,
              //   email: user.email,
              //   roles: authorities,
              //   accessToken: token
              // });
            
        };

        exports.archiveOne = (req, res) => {
          // res.status(200).send("it works");
          //   Comment.findByIdAndRemove({_id: req.body.id},function(err){
          //     if(err) res.json(err);
          //     else res.json('Successfully removed');
          // });
            Comment.findByIdAndUpdate({_id: req.body.id},{archived:true},function(err){
              if(err) res.json(err);
              else res.json('Successfully updated');
          });
          
                // res.status(200).send({
                //   id: user._id,
                //   username: user.username,
                //   email: user.email,
                //   roles: authorities,
                //   accessToken: token
                // });
              
          };


        exports.restore = (req, res) => {
          // res.status(200).send("it works");
          //   Comment.findByIdAndRemove({_id: req.body.id},function(err){
          //     if(err) res.json(err);
          //     else res.json('Successfully removed');
          // });
            Comment.updateMany({uid: req.body.id},{archived:false},function(err){
              if(err) res.json(err);
              else res.json('Successfully updated');
          });
          
                // res.status(200).send({
                //   id: user._id,
                //   username: user.username,
                //   email: user.email,
                //   roles: authorities,
                //   accessToken: token
                // });
              
          };

          exports.restoreOne = (req, res) => {
            // res.status(200).send("it works");
            //   Comment.findByIdAndRemove({_id: req.body.id},function(err){
            //     if(err) res.json(err);
            //     else res.json('Successfully removed');
            // });
              Comment.findByIdAndUpdate({_id: req.body.id},{archived:false},function(err){
                if(err) res.json(err);
                else res.json('Successfully updated');
            });
            
                  // res.status(200).send({
                  //   id: user._id,
                  //   username: user.username,
                  //   email: user.email,
                  //   roles: authorities,
                  //   accessToken: token
                  // });
                
            };
  


  