const asyncHandler = require("../Middleware/asyncHandler");
const User = require("../Models/userModel");
const Team = require("../Models/teamModal");

// Create team
const createTeam = asyncHandler(async (req, res) => {
    const { memberIds } = req.body;
  
    if (!memberIds || !Array.isArray(memberIds)) {
      res.status(400).json({ message: 'Invalid request data' });
      return;
    }
  
    try {
      // Ensure all member IDs are valid
      const existingUsers = await User.find({ id: { $in: memberIds } });

      // Filter out users with duplicate domains and availability
      const uniqueUsers = existingUsers.filter((user, index, self) =>
        index === self.findIndex(u => u.domain === user.domain && u.available === user.available)
      );

      // If any duplicate users were found, return error
      if (uniqueUsers.length !== existingUsers.length) {
        res.status(400).json({ message: 'Only users with unique domains and availability can be selected for the team' });
        return;
      }

      // Check if a team with the same members already exists
      const teamWithSameMembers = await Team.findOne({ members: { $all: uniqueUsers.map(user => user._id) } });
      if (teamWithSameMembers) {
        res.status(400).json({ message: 'Team with these members already exists' });
        return;
      }

      // Generate team name based on database index
      const teamCount = await Team.countDocuments();
      const teamName = `Team ${teamCount + 1}`;

      // Create the team
      const newTeam = new Team({
        name: teamName,
        members: uniqueUsers
      });
  
      const createdTeam = await newTeam.save();
  
      res.status(201).json(createdTeam);
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

const getAllTeams = asyncHandler(async (req, res) => {
  const allTeams = await Team.find();

  if (!allTeams || allTeams.length === 0) {
    res.status(404).json({ message: "No Teams found" });
  } else {
    res.status(200).json({ message: "SUCCESS", teams: allTeams });
  }
});

const fetchSingleTeam = async (req, res) => {
  const { _id } = req.params;

  try {
    const team = await Team.findById(_id).populate('members');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({ message: 'SUCCESS', team });
  } catch (error) {
    console.error('Error fetching single team:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createTeam, getAllTeams , fetchSingleTeam};
