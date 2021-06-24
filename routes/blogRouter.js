const express = require('express')
const router = express.Router()
const Blog = require('../models/blog')

//Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({})

    res.status(200).json(blogs)
  } catch (error) {
    res.json({message: error})
  }
})

//Get a specific blog
router.get('/:title', async (req, res) => {
  try {
    const theBlogDocument = await Blog.find({title: req.params.title})

    if (theBlogDocument.length === 0) {
      return res.send(`Can't find the blog`)
    }

    res.json({theBlogDocument})
  } catch (error) {
    res.status(400).json({message: error})
  }
})

//Create a new blog
router.post('/', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
  })

  try {
    const newlyCreatedBlog = await blog.save()
    
    res.status(201).json(newlyCreatedBlog)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

//Update a blog
router.patch('/:title', (req, res) => {
  res.send('hiadsf')
})

//Delete all blogs
router.delete('/', async (req, res) => {
  try {
    await Blog.deleteMany()

    res.status(200).send('Deleted all of the blogs')
  } catch (error) {
    res.status(500).json({message: error})
  }
})

//Delete a specific blog
router.delete('/:title', (req, res) => {
  res.send('hi')
})

module.exports = router