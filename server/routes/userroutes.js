const express = require('express')

//control import
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('../controllers/userController')

const router = express.Router()

//GET all users
router.get('/', getUsers)

//GET all users
router.get('/:id', getUser)

//POST new user
router.post('/', createUser)

//PATCH user
router.patch('/:id', updateUser)

//DELETE user
router.delete('/:id', deleteUser)


module.exports = router