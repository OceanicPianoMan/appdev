const Test = require('../models/testModel')
const mongoose = require('mongoose')

//get all test
const getTests = async (req, res) => {
  const tests = await Test.find({}).sort({createdAt: -1})

  res.status(200).json(tests)
}

//get single test
const getTest = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json( {error: 'no such document exsists!'} )
  }

  const test = await Test.findById(id)

  if (!test) {
    return res.status(404).json({error: 'no such document exsists!'})
  }

  res.status(200).json(test)
}


//create new test
const createTest = async (req, res) => {
  const { title, quantity, load } = req.body

  let emptyFields = []

  //error handling
  if(!title) {
    emptyFields.push('title')
  }
  if(!quantity) {
    emptyFields.push('quantity')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the remaining fields: ', emptyFields }) 
  }

  try {
    const testCreate = await Test.create( {title, quantity, load} )
    res.status(200).json(testCreate)

  } catch (error) {
    res.status(400).json( {error: error.message} )
  }
}

//delete a test
const deleteTest = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json( {error: 'no such document exsists!'} )
  }

  const testDelete = await Test.findOneAndDelete( {_id: id} )

  if (!testDelete) {
    return res.status(404).json({error: 'no such document exsists!'})
  }

  res.status(200).json(testDelete)
}

//update a test
const updateTest = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json( {error: 'no such document exsists!'} )
  }

  const testUpdate = await Test.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!testUpdate) {
    return res.status(404).json({error: 'no such document exsists!'})
  }

  res.status(200).json(testUpdate)

}

module.exports = {
  getTest,
  getTests,
  createTest,
  deleteTest,
  updateTest,
}