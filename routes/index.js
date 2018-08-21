var express = require("express");
var router = express.Router();
var db = require("../util/db");


//==============================================================untuk get user status
router.get("/:userID/myactivity", function(req, res, next) { //untuk mengambil aktifitaas id oorang berdasarkan yang login
  qMyActivity = `SELECT a.ID, a.PeopleID, b.first_name,  a.text, a.created_at, a.created_by, a.updated_at, a.updated_by, a.is_active, a.likes FROM Activity a INNER JOIN People b ON a.PeopleID = b.ID  WHERE a.PeopleID='`+req.params.userID+`' and a.is_active = 1`
  db.query(qMyActivity)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.json(err)
  })
})


//============================================================list dari status user di home
router.get("/:userID/list", function(req, res, next){
  console.log(req.body)
  var qActivity = `SELECT a.ID, a.PeopleID, b.first_name,  a.text, a.created_at, a.created_by, a.updated_at, a.updated_by, a.is_active, a.likes FROM Activity a INNER JOIN People b ON a.PeopleID = b.ID INNER JOIN Friends c ON a.PeopleID = c.PeopleID2 WHERE c.PeopleID='`+req.params.userID+`'and a.is_active = 1`;
  db.query(qActivity)
    .then(result => {
      var foo = [];
      result.forEach(e => { // meloopping data untuk mengambil data yang dibutuhkan dari user
        var data = {
          ID: e.ID,
          PeopleID: e.PeopleID,
          first_name: e.first_name,
          text: e.text,
          created_at: e.created_at,
          created_by: e.created_by,
          updated_at: e.updated_at,
          updated_by: e.updated_by,
          is_active: e.is_active,
          likes: e.likes,
        };
        foo.push(data)
      });
      res.send(foo)
      console.log(foo)
    })
    .catch(err => {
      console.log(err);
    });
});


//==================================================================menampilkan informasi activity berdasarkan ID
router.get("/:ID/view", function(req, res, next) {
  var qActivity = `SELECT ID, PeopleID, text, created_at, created_by, updated_at, updated_by, is_active, likes FROM Activity WHERE ID=`+req.params.ID+``;
  db.query(qActivity)
    .then(result => {
      var foo = [];
      result.forEach(e => {
        var data = {
          ID: e.ID,
          PeopleID: e.PeopleID,
          text: e.text,
          created_at: e.created_at,
          created_by: e.created_by,
          updated_at: e.updated_at,
          updated_by: e.updated_by,
          is_active: e.is_active,
          likes: e.likes,
        };
        foo.push(data)
      });
      res.json(foo)
    })
    .catch(err => {
      console.log(err);
    });
});

//===============================================================untuk membuat status

router.post("/", function(req, res, next) {
  var Activity = {
    PeopleID : parseInt(req.body.PeopleID),
    text : req.body.text
  }
  var qInsertActivity = `INSERT INTO Activity
  (PeopleID, 
  text, 
  created_at, 
  created_by, 
  updated_at, 
  updated_by, 
  is_active) 
VALUES 
  (`+Activity.PeopleID+`, 
  '`+Activity.text+`', 
  now(), 
  1, 
  null, 
  null, 
  1)`
  db.query(qInsertActivity)
  .then(data => {
    res.json(data)
    console.log('ini dari update status',data)
  })
  .catch(err => {
    res.json(err)
  })
})

//===========================================================================  ini untuk ngeget data coment di status, di innerjoinkan dengan people un tuk mendapatkan data nama yng komen yaitu peopleID

router.get("/:activityID/comments", function(req, res, next) {
  var qComment = `SELECT a.ID, a.ActivityID, a.PeopleID, b.first_name, a.text, a.is_active, a.created_at, a.created_by, a.updated_at, a.updated_by FROM Comment a INNER JOIN People b ON a.PeopleID = b.ID WHERE a.ActivityID= ?`;
  db.query(qComment, req.params.activityID)
  .then(result => {
    res.json(result)
  })
  .catch(err => {
    res.json(err)
  })
})



router.post("/:activityID/comment", function(req, res, next) {
  var qInsertComment = `INSERT INTO Comment
    (ActivityID, 
    PeopleID, 
    text, 
    is_active, 
    created_at, 
    created_by) 
  VALUES 
    (`+req.params.activityID+`, 
    `+req.body.PeopleID+`, 
    '`+req.body.text+`', 
    1, 
    now(), 
    `+req.body.PeopleID+`)`
  db.query(qInsertComment)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})



router.get("/:activityID/like", function(req, res, next) {
  var qLike = `SELECT ActivityID, PeopleID FROM Activity_People WHERE ActivityID =`+req.params.activityID+``
  db.query(qLike)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})



router.post("/:activityID/like", function(req, res, next) {
  var qInsertLike = `INSERT INTO Activity_People
    (ActivityID, 
    PeopleID) 
  VALUES 
    ( `+req.params.activityID+`, 
    `+req.body.PeopleID+`)`
  db.query(qInsertLike)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})


router.post("/:activityID/unlike", function(req, res, next) {
  var qDeleteLike = `DELETE FROM Activity_People WHERE ActivityID = `+req.params.activityID+` AND PeopleID = `+req.body.PeopleID+``
  db.query(qDeleteLike)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.json(err)
  })
})

//=======================================================================================================================hapus status

router.post("/status/delete",function(req,res,next){
  var data ={
      is_active: 0,
      ID: req.body.status_id
  }

  console.log(data)
  var qUpdateActive = `UPDATE Activity set is_active  ='`+data.is_active+`' where ID ='`+data.ID+`'`
  db.query(qUpdateActive,(err,result)=>{
    if(err) throw err
    res.send(result)
  })
})

module.exports = router;