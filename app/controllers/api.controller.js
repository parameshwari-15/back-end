const config = require("../config/auth.config");
const dbconfig = require("../config/db.config");
const db = require("../models");
const APIRecords = db.APIRecords;
var url = "mongodb://127.0.0.1:27017/bezkoder_db";
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// const xyz="db.APIRecords";
const Api = db.APIRecords;

exports.test = (req, res) => {
    res.status(200).send("testing comment");
  };
   
// exports.view = (req, res) => {
//   // res.status(200).send("it works");
//    MongoClient.connect(url, function(err, db) {

//     var cursor = db.collection('APIRecords').find();

//     cursor.each(function(err, doc) {
//         res.send(doc);
//         console.log(doc);

//     });
// }); 
//   };

// exports.view = (req, res)=> {
//     MongoClient.connect(url, function(err, client) {
//        var db=client.db('APISearch');
//         try {
//             assert.equal(null, err);
//             db.collection('APIRecords').find({'_id':"Alchemy Image Link Extraction-1"},function(err, doc) {
//                 assert.equal(null, err);
//                 // res.send(doc)
//                 console.log(doc);
//             })
//         } catch (err) {
//             console.log(err)

//         }
//     })
// }

exports.view = (req, res)=> {
  // res.status(200).send("it works");
  Api.find({
   // title: req.body.title
 })
   .exec((err, api) => {
     if (err) {
       res.status(500).send({ message: err });
       return;
     }

     if (!api) {
       return res.status(404).send({ message: "No Api found." });
     }
     res.status(200).send({
         api:api
     });
   });
}
  exports.postapi=(req,res)=>{
    console.log(req.body.apirecords)
     MongoClient.connect(url, function(err, client) {
                    var db=client.db('bezkoder_db');
                    apidata={
                    '_id': req.body.apirecords.apiname+''+req.body.apirecords.version,
                    'CreatedBy': req.body.apirecords.CreatedBy,
                    'Version' : req.body.apirecords.version,
                    'Swagger' :req.body.apirecords.swagger,
                    'Link': req.body.apirecords.link,
                    'Request':req.body.apirecords.request,
                    'apiname': req.body.apirecords.apiname,
                    'dateCreated':new Date(),
                    'Description':req.body.apirecords.description,
                    'access':req.body.apirecords.access
                    }
                        assert.equal(null, err);
                        db.collection('apirecords').insertOne(apidata, function(err, result) {
                                assert.equal(err, null);
                                client.close();
                                res.send({ 'message': 'Data added successfully', "registrationCode": apidata});
                        });
                   
                });
  }


  // exports.insert = (req, res) => {
  //   const comment = new Comment({
  //     title: req.body.title,
  //     comment: req.body.comment
  //   });
  
  //   comment.save((err, user) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }
  //     res.send({ message: "Comment was inserted successfully!" });
  //   });
  // }

  // exports.delete = (req, res) => {
  //   // res.status(200).send("it works");
  //     Comment.findByIdAndRemove({_id: req.body.id},function(err){
  //       if(err) res.json(err);
  //       else res.json('Successfully removed');
  //   });
    
          // res.status(200).send({
          //   id: user._id,
          //   username: user.username,
          //   email: user.email,
          //   roles: authorities,
          //   accessToken: token
          // });
        
    // };

    // exports.update = (req, res) => {
      // res.status(200).send("it works");
      //   Comment.findByIdAndRemove({_id: req.body.id},function(err){
      //     if(err) res.json(err);
      //     else res.json('Successfully removed');
      // });
      //   Comment.findByIdAndUpdate({_id: req.body.id},{comment:req.body.comment},function(err){
      //     if(err) res.json(err);
      //     else res.json('Successfully updated');
      // });
      
            // res.status(200).send({
            //   id: user._id,
            //   username: user.username,
            //   email: user.email,
            //   roles: authorities,
            //   accessToken: token
            // });
          
      // };


  