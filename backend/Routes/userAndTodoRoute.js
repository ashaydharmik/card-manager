const express = require("express");
const errorHandler = require("../Middleware/errorHandler");
const {
  getAllUsers, searchUsers, filterUsers, fetchUser
} = require("../Controller/userController");

const {createTeam, getAllTeams, fetchSingleTeam} = require("../Controller/teamController")

const router = express.Router();

router.get("/getUsers", getAllUsers);

router.get("/search", searchUsers);

router.get("/filterUser",filterUsers)
router.get("/fetchUser",fetchUser)

router.post("/createTeam", createTeam)
router.get("/getTeams", getAllTeams);

router.get("/getSingleTeam/:_id", fetchSingleTeam);

router.use(errorHandler);

module.exports = router;
