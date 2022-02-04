var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recruitment tool' });
});

router.get('/interviews', function(req, res, next) {
  res.render('interviews', { title: 'INTERVIEWS' });
});
module.exports = router;
