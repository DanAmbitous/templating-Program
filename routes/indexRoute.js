const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  res.render('index', {title: 'Home'})
})

module.exports = router