const config = require("../config/auth.config");
const db = require("../models");
var nodemailer = require('nodemailer');
const User = db.user;
const Role = db.role;
const Menu = db.menu;
var sixdigitsrandom;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    status: 'active',
    log_count:0,
    check_blocked:'unblocked',
    otp:100000
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.roles) {
      Role.findOne(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          user.roles = [roles._id];
          Menu.findOne({  name: "admin" },(err, menu) =>{
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            roles.menu=[menu._id];
            roles.save();
          });
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        Menu.findOne({name:"user"},(err, menu) =>{
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          role.menu=[menu._id];
          role.save();
        });
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  var date=new Date();
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
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if(!user.check_blocked.localeCompare('blocked')){
        return res.status(401).send({
          accessToken: null,
          message: "User left organization contact admin"
        });
      }
      else if(!user.status.localeCompare('inactive')){
        return res.status(401).send({
          accessToken: null,
          message: "User Blocked contact Admin"
        });
      }
      if (!passwordIsValid) {
        user.log_count+=1;
        if(user.log_count==3){
          user.status = "inactive";
          user.log_count=0;
          user.save();
          return res.status(401).send({
            accessToken: null,
            message: "User Blocked!"
          });  
        }
        else{
          user.save();
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      user.last_login=date;
      user.log_count=0;
      user.save();
      Role.findById((user.roles),(err,rolemenu)=>{
        if (err) {
                res.status(500).send({ message: err });
                return;
              }
        Menu.findById((rolemenu.menu),(err,menui)=>{
          if (err) {
                  res.status(500).send({ message: err });
                  return;
          }
        res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,      
        accessToken: token,
        menuitems: menui.menuitems
      });
        });
      });
    });
};
exports.reset = (req, res) => {
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
      //mail
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'parameshwari.it16@bitsathy.ac.in',
          pass: 'paramu*15'
        }
      });
      sixdigitsrandom = Math.floor(100000 + Math.random() * 900000);
      var mailOptions = {
        from: 'parameshwari.it16@bitsathy.ac.in',
        to: user.email,
        subject: 'Change Password',
        text: 'OTP :'+ sixdigitsrandom,
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      user.otp=sixdigitsrandom;
      user.save();
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email
      });
    });
};
exports.passCheck = (req, res) => {
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
      else if(req.body.otp != sixdigitsrandom){
        return res.status(404).send({ message: "Incorrect OTP." });
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email
      });
    });
};
exports.otp = (req, res) => {
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
      else if(req.body.otp.localeCompare(user.otp)){
        return res.status(404).send({ message: "Incorrect OTP." });
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email
      });
    });
};