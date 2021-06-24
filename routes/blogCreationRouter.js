const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('blogCreation', {title: 'Write a Blog'})
})

module.exports = router