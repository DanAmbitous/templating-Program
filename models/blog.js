const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  author: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Blog', blogSchema)