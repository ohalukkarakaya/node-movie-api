const { json } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require("../models/Users");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


//register
router.post('/register', (req, res) => {
  const {username, password} = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username,
      password: hash
    });
  
    const promise = user.save();
  
    promise.then(
      (data) => {
        res.json(data);
      }
    ).catch(
      (err) => {
        res.json(data);
      }
    );
  });
});

//delete user
router.delete('/register', (req, res) => {
  const {username, password} = req.body;

  User.findOne({
    username,
  }, (err, user) => {
    if(err)
      throw err;

    if(!user){
      res.json({
        status: false,
        message: 'Authentication Failed, User Not Found',
      });
    }else{
      bcrypt.compare(password, user.password).then(
        (result) => {
          if(!result){
            res.json({
              status: false,
              message: 'Authentication Failed, Password Is Not Correct',
            });
          }else{
            user.deleteOne();
            res.json({
              status: true,
              message: "User Deleted",
            })
          }
        }
      );
    }
  });
});

//login, authentication
router.post('/authenticate', (req, res) => {
  const {username, password} = req.body;
  User.findOne({
    username,

  }, (err, user) => {
    if(err)
      throw err;

    if(!user){
      res.json({
        status: false,
        message: 'Authentication Failed, User Not Found',
      });
    }else{
      bcrypt.compare(password, user.password).then(
        (result) => {
          if(!result){
            res.json({
              status: false,
              message: 'Authentication Failed, Password Is Not Correct',
            });
          }else{
            const payload = {
              username
            };
            const token = jwt.sign(payload, req.app.get('api_secret_key'), {
              expiresIn: 720 // 12 saat
            });

            res.json({
              status: true,
              token
            });
          }
        }
      );
    }
  });
});

module.exports = router;
