const asyncHandler = require("../Middleware/asyncHandler");
const User = require("../Models/userModel");


//user 
const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find();

  if (!allUsers || allUsers.length === 0) {
    res.status(404).json({ message: "No users found" });
  } else {
    res.status(200).json({ message: "SUCCESS", users: allUsers });
  }
});


//search
const searchUsers =  asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { first_name: { $regex: query, $options: 'i' } }, 
        { last_name: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

//filter
const filterUsers = asyncHandler(async (req, res) => {
  try {
    const { domain, gender, available } = req.query;
    let query = {};

    if (domain) {
      query.domain = domain;
    }
    if (gender) {
      query.gender = gender;
    }
    if (available !== undefined) {
      query.available = available;
    }

    const filteredUsers = await User.find(query);
    res.json(filteredUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//fetching single user data
const fetchUser = asyncHandler(async (req, res) => {
  const { id } = req.query;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = filterUsers;




module.exports = { getAllUsers, searchUsers, filterUsers, fetchUser};
