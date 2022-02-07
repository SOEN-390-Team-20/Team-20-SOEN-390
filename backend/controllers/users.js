var express = require('express');
const usersRouter = express.Router();
const User = require("../models/user")
var MongoClient = require('mongodb').MongoClient;
const config = require('../utils/config')

const dbName = config.DBNAME
const url = config.MONGO_URI 

usersRouter.post('/add-user', function (req, res) {

  var hin = req.body.hin
  var email = req.body.email
  var password = req.body.password
  var role = req.body.role
  var firstName = req.body.firstName
  var lastName = req.body.lastName

  if (hin == '' || firstName == '' || email == '' || password == '' || lastName == '' || role == '') {
    res.send("error: missing fields")
  }
  else {
    var payload = new User()
    payload.firstName = firstName
    payload.email = email
    payload.hin = hin
    payload.password = password
    payload.role = role
    payload.lastName = lastName

    payload.save((err, data) => {
      if (err) {
        console.log(err)
        res.send("error: email or health insurance number already taken ")
      }
      else {
        res.send("perfect: form sent")
        console.log(data)
      }
    })
  }
});

usersRouter.get('/users', function (req, res) {
  return_query(function (result) {
    res.send(result)
  });

});

usersRouter.post('/login', function (req, res) {
  if (req.body.email == null || req.body.password == null) {
    res.send("error: field missing")

  }
  else {
    return_query_load(function (result) {
      if (result[0] != undefined && result[0].password == req.body.password) {
        res.send(result)
      }
      else {
        res.send("error: invalid password")
      }
    }, req.body.email);
  }
});

function return_query(my_callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var db_var = db.db(dbName);
    db_var.collection("channels").find().toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      my_callback(result)
      db.close()
    });
  });
};

function return_query_load(my_callback, load) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var db_var = db.db(dbName);
    db_var.collection("channels").find({ email: load }).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      my_callback(result)
      db.close()
    });
  });
};

module.exports = usersRouter;