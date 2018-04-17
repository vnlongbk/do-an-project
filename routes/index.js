var express = require('express');
var router = express.Router();
var adminRouter = require('./admin')
var trangchuRouter = require('./trang-chu')
var userRouter = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('trang-chu')
});



router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/trang-chu', trangchuRouter)

module.exports = router;
