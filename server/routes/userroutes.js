const express = require('express')
const router = express.Router()


//control import
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
  handleFollow,
  handleFollowing,
  createList,
  deleteList
} = require('../controllers/userController')

//GET all users
router.get('/', getUsers)

//GET all users
router.get('/:id', getUser)

//POST new user
router.post('/createUser', createUser)

// POST login
router.post('/loginUser', loginUser);

//PATCH user
router.patch('/:id', updateUser)

//DELETE user
router.delete('/:id', deleteUser)

router.post('/:id/follow', handleFollow);
router.post('/:id/following', handleFollowing);
router.post('/:id/lists', createList);
router.delete('/:id/lists/:listId', deleteList);

module.exports = router