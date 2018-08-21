var express = require('express');
var router = express.Router();
var db = require('../util/db');
var _ = require('lodash');


/* GET users listing. */
router.get('/', function(req, res, next) {
  var pQuery = `SELECT ID, first_name, last_name, birth_date, address, email, password, created_at, created_by, updated_at, updated_by, is_active, image_profile, image_background FROM People where is_active = 1;`
  db.query(pQuery)
    .then(data => {
      var foo = []
      data.forEach(e => {
        var bar = {
          ID : e.ID, 
          first_name : e.first_name, 
          last_name : e.last_name, 
          birth_date:e.birth_date,
          address: e.address, 
          email:e.email, 
          password:e.password, 
          created_at : e.created_at,
          created_by : e.created_by, 
          updated_at : e.updated_at, 
          updated_by : e.updated_by, 
          is_active : e.is_active, 
          image_profile: 'http://localhost:5000/images/'+e.image_profile, 
          image_background: 'http://localhost:5000/images/'+e.image_background
        }
        foo.push(bar)
      });
      res.json(foo);
    })
    .catch(err => {
      res.json(err)
    })
});

router.post('/login', function(req, res, next) {
  var pQuery = `SELECT ID, email, password, is_active FROM People WHERE email='`+req.body.email+`' AND password='`+req.body.password+`'`
  db.query(pQuery)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err)
    })
});

router.get('/:ID', function(req, res, next) {
  var pQuery = `SELECT ID, first_name, last_name, birth_date, address, email, password, created_at, created_by, updated_at, updated_by, is_active, image_profile, image_background FROM People WHERE ID=`+req.params.ID+``
  db.query(pQuery)
    .then(data => {
      var foo = []
      data.forEach(e => {
        var bar = {
          ID : e.ID, 
          first_name : e.first_name, 
          last_name : e.last_name, 
          birth_date:e.birth_date,
          address: e.address, 
          email:e.email, 
          password:e.password, 
          created_at : e.created_at,
          created_by : e.created_by, 
          updated_at : e.updated_at, 
          updated_by : e.updated_by, 
          is_active : e.is_active, 
          image_profile: 'http://127.0.0.1:5000/images/'+e.image_profile, 
          image_background: 'http://127.0.0.1:5000/images/'+e.image_background
        }
        foo.push(bar)
      });
      res.json(foo);
    })
    .catch(err => {
      res.json(err)
    })
});

router.post('/', function(req, res, next) {
  if (_.isEmpty(req.body.image_profile)) {
    req.body.image_profile = 'default_profile.png' 
  }
  if (_.isEmpty(req.body.image_background)) {
    req.body.image_background = 'default_background.png' 
  }
  var qInsertPeople = `INSERT INTO People
      (first_name, 
      last_name, 
      birth_date, 
      address, 
      email, 
      password, 
      created_at, 
      created_by, 
      updated_at, 
      updated_by, 
      is_active,
      image_profile, 
      image_background) 
    VALUES 
      ("`+req.body.first_name+`", 
       "`+req.body.last_name+`", 
       "`+req.body.birth_date+`", 
       "`+req.body.address+`", 
       "`+req.body.email+`", 
       "`+req.body.password+`", 
       now(), 
       1, 
       null, 
       null, 
       1,
       "`+req.body.image_profile+`",
       "`+req.body.image_background+`")`
    db.query(qInsertPeople)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})


router.post("/:ID/update", function(req, res, next) {
  if (_.isEmpty(req.body.image_profile)) {
    req.body.image_profile = 'default_profile.png' 
  }
  if (_.isEmpty(req.body.image_background)) {
    req.body.image_background = 'default_background.png' 
  }

  var qUpdatePeople = `UPDATE People SET 
    first_name = '`+req.body.first_name+`', 
    last_name = '`+req.body.last_name+`', 
    birth_date = '`+req.body.birth_date+`', 
    address = '`+req.body.address+`', 
    email = '`+req.body.email+`', 
    password = '`+req.body.password+`', 
    updated_at = now(), 
    updated_by = '`+req.params.ID+`', 
    is_active = `+req.body.is_active+`, 
    image_profile = '`+req.body.image_profile+`', 
    image_background = '`+req.body.image_background+`' 
  WHERE
    ID = `+req.params.ID+``
  
    db.query(qUpdatePeople)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json(err)
    })
})

router.get('/:userID/friends', function(req, res, next) {
  var qFriends = `select a.first_name,b.PeopleID2 from People a inner join Friends b On a.ID = b.PeopleID2 WHERE b.PeopleID = ?`
  db.query(qFriends, req.params.userID)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

router.post("/:userID/follow",function(req, res, next) {
  var qInsertFriend = `INSERT INTO Friends
    (PeopleID, 
      
    PeopleID2) 
  VALUES 
    (`+req.params.userID+`, 
    `+req.body.peopleID2+`)`
  db.query(qInsertFriend)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

router.post("/:userID/unfollow", function(req, res, next) {
  var qDeleteFriend = `DELETE FROM Friends WHERE PeopleID = `+req.params.userID+` AND PeopleID2 = `+req.body.peopleID2+``
  db.query(qDeleteFriend)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

module.exports = router;