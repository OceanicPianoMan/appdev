const express = require('express')

//control import
const {
  getTest,
  getTests,
  createTest,
  deleteTest,
  updateTest,
} = require('../controllers/testController')

const router = express.Router()

//GET all tests
router.get('/', getTests)

//GET single test
router.get('/:id', getTest)

//POST new test
router.post('/', createTest)

//DELETE a test
router.delete('/:id', deleteTest)

//UPATE a test
router.patch('/:id', updateTest)

module.exports = router