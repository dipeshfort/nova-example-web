var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nova Shop 2018' });
});

router.get('/:any', function(req, res, next) {
  res.render('index', { title: 'Nova Shop 2018' });
});

module.exports = router;
