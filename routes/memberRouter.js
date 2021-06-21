const express = require('express')
const router = express.Router()
const Member = require('../models/member.js')

//Get all members
router.get('/', async (req, res) => {
  try {
    const memberDocuments = await Member.find()

    res.send(memberDocuments)
  } catch (error) {
    res.status(500).json({message: error})
  }
})

//Get a specific member
router.get('/:username', async (req, res) => {
  try {
    const theMemberDocument = await Member.find({username: req.params.username}) 

    if (theMemberDocument == null) {
      return res.json({message: `Can't find the member`})
    }

    res.json({theMemberDocument})
  } catch (error) {
    res.status(400).json({message: error})
  }
})

//Create a new member
router.post('/', async (req, res) => {
  const member = new Member({
    username: req.body.username,
    password: req.body.password
  })

  try {
    const newlyCreatedMember = await member.save()

    res.status(201).json(newlyCreatedMember)
  } catch (error) {
    res.status(400).json({message: error})
  }
})

// Update a specific member 
router.patch('/:username', getMemberByUsername, async (req, res) => {
  console.log(res.member[0].password)

  if (req.body.username != null) {
    res.member[0].username = req.body.username
  }

  if (req.body.password != null) {
    res.member[0].password = req.body.password
  }

  console.log(res.member)

  try {
    await res.member[0].save()

    res.json(res.member)
  } catch (error) {
    res.status(400).json(error)
  }
})

//Delete a specific member
router.delete('/:username', async (req, res) => {
  try {
    const memberDocument = await Member.find({username: req.params.username}) 

    await Member.deleteOne({username: req.params.username}) 

    res.status(200).json({message: `Removed the member by the name of ${memberDocument[0].username}`})
  } catch (error) {
    res.status(400).json({message: `There isn't a member by the name of ${req.params.username}`})
  }
})

//Delete all members 
router.delete('/', async (req, res) => {
  try {
    await Member.deleteMany()

    res.status(200).json({message: 'Successfully deleted of the members'})
  } catch (error) {
    res.status(500).json({message: error})
  }
})

async function getMemberByUsername(req, res, next) {
  let member

  try {
    member = await Member.find({username: req.params.username})
      
    console.log(member + 'asdf')

    if (member == null) {
      return res.status(404).json({ message: "Cannot find User" })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.member = member
  next()
}

module.exports = router