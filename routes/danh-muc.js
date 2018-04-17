var express = require('express');
var router = express.Router();
const Category = require('../model/category')
const checkUserMiddleware = require('../model/middleware')

//--------GET---------


router.get('/them-muc', checkUserMiddleware, async (req, res) => {
  const parent = await Category.find();
  res.render('them-muc',{
    layout:'admin',
    parent,
    breadcrumb: `
    <li class="breadcrumb-item">
      <a href="/admin/danh-muc/list-danh-muc">Danh mục</a>
    </li>
    <li class="breadcrumb-item active" aria-current="page">Tạo danh mục</li>
    `
  })
})

router.get('/list-danh-muc', checkUserMiddleware ,async (req, res) =>{
  const data = await Category.find().populate('parent');
  res.render('list-danh-muc',{
    layout: 'admin',
    data,
    breadcrumb: `
    <li class="breadcrumb-item active" aria-current="page">Danh mục</li>
    `
  })
})

router.get('/sua/:id', checkUserMiddleware ,async (req, res) =>{
  const id = req.params.id
  const data = await Category.find();
  const parent = await Category.findById(id).populate('parent');
  
  res.render('sua-danh-muc',{
    layout: 'admin',
    parent,
    data,
    breadcrumb: `
    <li class="breadcrumb-item">
      <a href="/admin/danh-muc/list-danh-muc">Danh mục</a>
    </li>
    <li class="breadcrumb-item active" aria-current="page">Chỉnh sửa danh mục</li>
    `
  })

})
//--------GET---------

//--------POST---------

router.post('/them-muc', async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
    img: req.body.img,  
    description: req.body.description
  })

  if (req.body.parent !== '') {
    newCategory.parent = req.body.parent
  }
  await newCategory.save()
  res.redirect('/admin/danh-muc/list-danh-muc')
})

router.post('/sua/:id', async (req, res) => {
  const id = req.params.id
  const data = req.body
  const edit = await Category.findById(id)
    edit.name = data.name
    edit.description = data.description
    edit.img = data.img
    if(data.parent !== '') {
     edit.parent = data.parent
    }else {
      edit.parent = undefined
    }
  await edit.save()
  res.redirect('/admin/danh-muc/list-danh-muc')
})  

//--------POST---------

//--------DELETE--------

router.get('/xoa/:id', checkUserMiddleware ,async (req, res) =>{
  const id = req.params.id
  const dele = await Category.findById(id)
  await dele.remove()
  res.redirect('/admin/danh-muc/list-danh-muc')
})

//--------DELETE--------
module.exports = router