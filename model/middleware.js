const checkUserMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/trang-chu/dang-nhap')
    }
  }

module.exports = checkUserMiddleware