var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about'); // zoekt naar views/about.pug
});

module.exports = router;

module.exports = router;
