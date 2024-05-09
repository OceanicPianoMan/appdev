const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}

//get single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such user exists!' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'No such user exists!' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}

//create new user
const createUser = async (req, res) => {
  const { 
    firstName, 
    lastName, 
    password,
    username,
    followers,
    following,
    listQuantity,
    albumQuantity,
    reviewQuantity
     } = req.body

  let emptyFields = []

  //error handling
  if(!firstName) {
    emptyFields.push('firstName')
  }
  if(!lastName) {
    emptyFields.push('lastName')
  }
  if(!password) {
    emptyFields.push('password')
  }
  if(!username) {
    emptyFields.push('username')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the remaining fields: ', emptyFields }) 
  }

  try {
    const userCreate = await User.create( {
      firstName, 
      lastName, 
      password,
      username,
      followers,
      following,
      listQuantity,
      albumQuantity,
      reviewQuantity} )
    res.status(200).json(userCreate)

  } catch (error) {
    res.status(400).json( {error: error.message} )
  }
}

//delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json( {error: 'no such user exsists!'} )
  }

  const userDelete = await User.findOneAndDelete( {_id: id} )

  if (!userDelete) {
    return res.status(404).json({error: 'no such user exsists!'})
  }

  res.status(200).json(userDelete)
}

//update a user
const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json( {error: 'no such user exsists!'} )
  }

  const userUpdate = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!userUpdate) {
    return res.status(404).json({error: 'no such user exsists!'})
  }
  res.status(200).json(userUpdate)
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
}