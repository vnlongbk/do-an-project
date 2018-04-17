var express = require('express')
var router = express.Router();
var calendar = require('../model/calendar')
var profile = require('../model/profile')
var articles = require('../model/article')

router.get('/', async (req, res) =>{
    const article = await articles.find()
    res.render ('trang-chu',{
        layout:'',
        calendar,
        profile,
        article
    })
})

router.get('/dang-nhap', (req, res) =>{
    res.render ('dang-nhap',{
        layout:''
    })
})


module.exports = router