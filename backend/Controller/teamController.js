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
    
      const existingUsers = await User.find({ id: { $in: memberIds } });

      
      const uniqueUsers = existingUsers.filter((user, index, self) =>
        index === self.findIndex(u => u.domain === user.domain && u.available === user.available)
      );

     
      if (uniqueUsers.length !== existingUsers.length) {
        res.status(400).json({ message: 'Only users with unique domains and availability can be selected for the team' });
        return;
      }

     
      const teamWithSameMembers = await Team.findOne({ members: { $all: uniqueUsers.map(user => user._id) } });
      if (teamWithSameMembers) {
        res.status(400).json({ message: 'Team with these members already exists' });
        return;
      }

  
      const teamCount = await Team.countDocuments();
      const teamName = `Team ${teamCount + 1}`;

    
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

//get all team data
const getAllTeams = asyncHandler(async (req, res) => {
  const allTeams = await Team.find();

  if (!allTeams || allTeams.length === 0) {
    res.status(404).json({ message: "No Teams found" });
  } else {
    res.status(200).json({ message: "SUCCESS", teams: allTeams });
  }
});

//fetching single teams data
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

//delete a team
const deleteTeam = asyncHandler(async (req, res) => {
  const { _id, teamName } = req.params;

  if (!_id) {
    res
      .status(400)
      .json({ error: "Invalid request" });
    return;
  }

  const deletedTeam = await Team.findByIdAndDelete(_id);

  if (!deletedTeam) {
    res.status(404).json({ error: "Created Team not found." });
  } else {
    res
      .status(200)
      .json({
        message: "Team Successfully Deleted!!",
        taskName: deletedTeam.teamName,
      });
  }
});


module.exports = { createTeam, getAllTeams , fetchSingleTeam, deleteTeam};
