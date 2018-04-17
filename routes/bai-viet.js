const express = require ('express');
const router = express.Router ();
const Article = require('../model/article');
const Category = require('../model/category')
const checkUserMiddleware = require('../model/middleware')
//--------GET--------

router.get('/dang-bai', checkUserMiddleware, async (req, res) => {
  const cates = await Category.find();
    res.render('dang-bai', {
      layout: 'admin',
      cates,
      breadcrumb: `
    <li class="breadcrumb-item">
      <a href="/admin/bai-viet">Bài viết</a>
    </li>
    <li class="breadcrumb-item active" aria-current="page">Đăng bài</li>
    `
    })
  })
  
router.get('/', checkUserMiddleware, async (req, res) => { 
  const data = await Article.find().populate('category');
    res.render('list-bai-viet', {
      layout: 'admin',
      data,
      breadcrumb: `
      <li class="breadcrumb-item active" aria-current="page">Bài viết</li>
      `
    })
  })

router.get('/sua/:id', checkUserMiddleware,async (req, res) =>{
  const id = req.params.id
  const data = await Article.findById(id).populate('category');
  const cates = await Category.find();
  res.render('sua-bai',{
    layout: 'admin',
    data,
    cates,
    breadcrumb: `
    <li class="breadcrumb-item">
      <a href="/admin/bai-viet">Bài viết</a>
    </li>
    <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa bài viết</li>
    `    
  })
})  
//--------GET--------

//--------POST--------
router.post('/dang-bai/json', async (req, res) => {
  
    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      content: req.body.content,
      img: req.body.img
  
    })
    await newArticle.save()
    res.redirect('/admin/bai-viet')
  })

router.post('/sua/:id', async (req, res) => {
  const id = req.params.id
  const data = req.body
  
  const edit = await Article.findById(id)
    edit.title=data.title
    edit.description=data.description
    edit.content=data.content
    edit.category=data.category
    edit.img=data.img
  
  await edit.save()
  res.redirect('/admin/bai-viet')
})  

//--------POST--------

//--------DELETE--------

router.get('/xoa/:id', checkUserMiddleware ,async (req, res) =>{
  console.log(req.params)
  const id = req.params.id
  const dele = await Article.findById(id)
  await dele.remove()
  res.redirect('/admin/bai-viet')
})

//--------DELETE--------

module.exports = router;