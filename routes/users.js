var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Chức năng đang cập nhật');
});

module.exports = router;
