var express = require('express');
var router = express.Router();
const danhmucRouter = require('./danh-muc');
const baivietRouter = require('./bai-viet')
const User = require('../model/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const FacebookStategy = require('passport-facebook').Strategy


// -------------GET-------------

passport.serializeUser((user, done) =>{
    done(null, user.id)
})
passport.deserializeUser( async (id, done) =>{
    const user = await User.findById(id);
    done(null, user)    
})

// xủ lý đăng nhập tk thường
passport.use(new LocalStrategy( async (username, password, done) =>{
    const user = await User.findOne({ username: username })
    if(!user) {
        return done(null, false, {message:'incorrect username.'});
    }
    if(user.password !== password) {
        return done(null, false, {message:'incorrect password'})
    }
    return done(null, user)
}))

// xủ lý đăng nhập tk facebook
// passport.use(new FacebookStategy(
//     {
//         clientID: "1562897993836297",
//         clientSecret: "d72d8d69cf6e04ae91f17c4e687f238d",
//         callbackURL:'http://localhost:3000/admin/auth/fb/cb',
//         profileFields:['email', 'gender', 'locate', 'displayName']
//     },
//     (accessToken, refreshToken, profile, done) => {
//         console.log(profile)
        
//     }
// ))




// đăng nhập bằng tài khoản thường
router.post('/user', passport.authenticate('local',{
    successRedirect:'/admin/bai-viet',
    failureRedirect:'/trang-chu/dang-nhap',
    // failureFlash:true
}))

// // đăng nhập bằng fb
// router.get('/admin/auth/fb', passport.authenticate('facebook'),{scope:['email,']})
// router.get('/admin/auth/fb/cb', passport.authenticate('facebook',{
//     successRedirect:'admin/bai-viet',
//     failureRedirect:'/trang-chu/dang-nhap',
// }))

// đăng xuất
router.get('/log-out',(req, res) =>{
    req.logout();
    res.redirect('/trang-chu')
})
// -------------GET-------------

// -------------POST-------------


// -------------POST-------------

// -------------USE-------------

router.use('/danh-muc', danhmucRouter);
router.use('/bai-viet', baivietRouter)

// -------------USE-------------

module.exports = router;
