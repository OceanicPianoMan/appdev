const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h', // Token expires in 1 hour
    }
  );
};

// Login functionality
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  let emptyFields = [];

  //error handling
  if (!username) {
    emptyFields.push('username');
  }
  if (!password) {
    emptyFields.push('password');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the remaining fields: ', emptyFields });
  }

  try {
    // Check if username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Password is correct, generate JWT token
    const token = generateToken(user);

    res.status(200).json({ token: token, username: username, _id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

//create new user
const createUser = async (req, res) => {
  const { 
    firstName, 
    lastName, 
    password,
    username
  } = req.body;

  let emptyFields = [];
  //error handling
  if (!firstName) {
    emptyFields.push('firstName');
  }
  if (!lastName) {
    emptyFields.push('lastName');
  }
  if (!password) {
    emptyFields.push('password');
  }
  if (!username) {
    emptyFields.push('username');
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in the remaining fields: ', emptyFields });
  }

  try {    
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Cannot register.\nUsername already in use. Please create a new one.', emptyFields: [] });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      firstName, 
      lastName, 
      password: hashedPassword,
      username,
      followers: 0,
      following: 0,
      listQuantity: 0,
      albumQuantity: 0,
      reviewQuantity: 0
    });

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(200).json({ token: token, username: username, _id: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    // Create a clickable link for the username
    const userProfileLink = `/user/${user._id}`;
    
    // Return the user with the clickable username link
    res.status(200).json({ ...user.toObject(), profileLink: userProfileLink });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const handleFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such user exists!' });
    }

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'No such user exists!' });
    }

    if (action === 'add') {
      user.followers += 1;
    } else if (action === 'remove') {
      if (user.followers === 0) {
        return res.status(400).json({ error: 'User has no followers' });
      }
      user.followers -= 1;
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    user = await user.save();

    res.status(200).json({ message: 'Followers updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const handleFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'No such user exists!' });
    }

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'No such user exists!' });
    }

    if (action === 'add') {
      user.following += 1;
    } else if (action === 'remove') {
      if (user.following === 0) {
        return res.status(400).json({ error: 'User has no following' });
      }
      user.following -= 1;
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    user = await user.save();

    res.status(200).json({ message: 'Followers updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createList = async (req, res) => {
  const { listName, listItems } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Push new list object into lists array
    user.lists.push({ name: listName, items: listItems });

    // Increment list quantity
    user.listQuantity++;

    await user.save();

    res.status(200).json(user.lists);
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteList = async (req, res) => {
  const { id, listId } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the index of the list in the user's lists array
    const listIndex = user.lists.findIndex(list => list._id.toString() === listId);

    // If listIndex is -1, the list was not found
    if (listIndex === -1) {
      return res.status(404).json({ error: 'List not found' });
    }

    // Remove the list from the user's lists array
    user.lists.splice(listIndex, 1);

    // Decrement list quantity if it's not already 0
    if (user.listQuantity > 0) {
      user.listQuantity--;
    }

    await user.save();

    res.status(200).json(user.lists);
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
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
}