const db = require("../models");
var fs = require('fs');
var bcrypt = require("bcryptjs");
var config = require("../config/auth.config")
var jwt = require("jsonwebtoken");
const What = db.whatsnew;
const User = db.user;
const Menu = db.menu;
const Api=db.APIRecords;
var color = '#333333';
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.changeStatus=(req,res) => {
  User.findOne({
    username: req.body.status
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if(!user.status.localeCompare('active')){
        user.status="inactive";
      }else{
        user.status="active";
      }
      user.save();
      res.status(200).send({
        status: user.status
      });
    });
};
exports.checkBlocked=(req,res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if(!user.check_blocked.localeCompare('unblocked')){
        user.check_blocked="blocked";
      }else{
        user.check_blocked="unblocked";
      }
      user.save();
      res.status(200).send({
      check_blocked: user.check_blocked
      });
    });
};
exports.allUsers = (req, res) => {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(JSON.stringify(userMap));  
  });
};
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};
exports.changemail =(req,res) =>{
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log("came here");
      user.email=req.body.mail;
      user.save();
      res.status(200).send("Usermail changed successfully");
    });
}
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
exports.getColor = (req,res) =>{
  console.log('GET color'+color);
  res.status(200).send(color);
}
exports.setColor = (req,res) =>{
  console.log(typeof(req.body.color));
  console.log(color);
  color=req.body.color;
  console.log('color changed'+color);
  res.status(200).send('Color Changed');
}
exports.changePassword = (req,res) =>{
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.password=  bcrypt.hashSync(req.body.password, 8);
      user.save();
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email
      });
    });
};
exports.hideapps = (req,res) =>{
  Menu.findOne({name:"user"},(err,menu)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    menu.menuitems=req.body.hideapp;
    menu.save();
  }) 
  res.status(200).send({ message: "success" });
}
exports.uploadimg = (req,res) =>{
  User.findOne({username:req.body.username},(err,user)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    user.img.data = fs.readFileSync(req.body.avatar);
    user.img.contentType = 'image/png';
    user.save();
    return res.status(200).send("success");
  })
}
exports.getApps = (req,res) =>{
  Menu.findOne({name:"user"},(err,menu)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    return res.status(200).send({ apps: menu.menuitems });
  }) 
}
exports.getRequest = (req,res)=>{
  User.findOne({username:req.body.username},(err,user)=>{
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    console.log(user.apiaccess.username)
    return res.status(200).send({
      request: user.apiaccess.username,
      token:user.accesstoken
    });
  });
}
exports.checkaccess = (req,res) =>{
  var temp;
  Api.findOne({apiname:req.body.apiname},(err,apirecord)=>{
    if(err){
      res.status(500).send({ message: err });
      return;
    }
    if("public".localeCompare(apirecord.access)){
      User.findOne({username:apirecord.CreatedBy},(err,user)=>{
        if(err){
          res.status(500).send({ message: err });
          return;
        }
          temp=user.apiaccess.username;
          if(!user.apiaccess.username.length){
            user.apiaccess={username: [req.body.username]}; 
          }else{
            temp.push(req.body.username)
            user.apiaccess={username: temp}; 
          }
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
        });
      return res.status(200).send({
        request : apirecord.CreatedBy,
        contenttype: "private",
        token : ''
      });
      })
    }else{
      return res.status(200).send("public content");
    }
  })
}
exports.getPermission =(req,res) =>{
  var temp,tokentemp;
  User.findOne({username:req.body.username},(err,user)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if("accept".localeCompare(req.body.apipermission)){
      temp=user.apiaccess.username
      temp.remove(req.body.user)
      var token=jwt.sign(req.body.user,config.secret)
      tokentemp=user.apiaccess.ApiToken
      tokentemp.remove(token)
      user.apiaccess.ApiToken=tokentemp;
      User.findOne({username:req.body.user},(err,useri)=>{
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        useri.accesstoken=''
        useri.save();
      })
      user.save();
      return res.status(200).send("permission denied")
    }
    else{
      var token = jwt.sign(req.body.user,config.secret)
      temp=user.apiaccess.username;
      tokentemp=user.apiaccess.ApiToken
      tokentemp.push(token)
      user.apiaccess={
        username:temp,
        ApiToken:tokentemp
      }
      User.findOne({username:temp},(err,useri)=>{
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        useri.accesstoken=token;
        console.log(useri);
        useri.save()   
      })
      user.save()
      return res.status(200).send(token)
      }
  })
}
exports.checkToken = (req,res) =>{
  User.findOne({username:req.body.username},(err,user)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log(user)
    return res.status(200).send({
      token : user.accesstoken
    })
  })
}
exports.whatsnew =(req,res) =>{
  const what = new What({
    data: req.body.whatsdata
  });
  what.save();
 return res.status(200).send("success")
}
exports.sendwhats = (req,res)=>{
  What.find({},(err,what)=>{
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send(what);
  });
}
exports.deletewhats = (req, res) => {
    What.findByIdAndRemove({_id: req.body.whatsid},function(err){
      if(err) res.json(err);
  });
    res.status(200).send("deleted");
      
  };
exports.piechartCount =(req,res)=>{
  var publicCount=0,privateCount=0,totalCount=0;
  publicCount=Api.count({access:"public"},(err,result)=>{
    if(err){
      console.log(err)
    }
    publicCount=result
    console.log(result)
  });
  privateCount=Api.count({access:"private"},(err,result)=>{
    if(err){
      console.log(err)
    }
    privateCount=result
    console.log(result)
  });
  totalCount=Api.count({},(err,result)=>{
    if(err){
      console.log(err)
    }
    totalCount=result
    console.log(totalCount)
  });
  console.log(totalCount)
  res.status(200).send("success")
}