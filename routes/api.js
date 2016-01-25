var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('cwinetwork.s3db');


/* CREATE USER ACCOUNT */
router.post('/createUser', function(req, res, next) {
  tSQL =  " INSERT INTO users";
  tSQL += " (username,upassword,uemail,access)";
  tSQL += " VALUES";
  tSQL += " ($username,$upassword,$uemail,$access)";
  tFill = {};
  tFill.$username = req.body.username
  tFill.$upassword = req.body.password
  tFill.$uemail = req.body.email
  tFill.$access = 4
  db.run( tSQL, tFill, function(e, r) {
    if (e == undefined) {
      res.send(JSON.stringify({'E': 'false'}));
    } else {
      res.send(JSON.stringify({'E': 'true'}));
    }
  });
});

/* Auth User */
router.post('/authUser', function(req, res, next){
  tCB = function(e,r) {
    if (e == null && r.length == 1 && r[0].upassword == req.body.password) {
      res.send(JSON.stringify({'E': 'false'}))
    } else {
      res.send(JSON.stringify({'E': 'true'}))
    }
  }
  tSQL = " SELECT * FROM users WHERE username == ?";
  db.all( tSQL, req.body.username, tCB);
});


module.exports = router;