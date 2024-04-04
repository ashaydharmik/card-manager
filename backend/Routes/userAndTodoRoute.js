const express = require("express");
const errorHandler = require("../Middleware/errorHandler");
const {
  getAllUsers, searchUsers, filterUsers, fetchUser, deleteUser
} = require("../Controller/userController");


const {createTeam, getAllTeams, fetchSingleTeam,deleteTeam } = require("../Controller/teamController")

const router = express.Router();

router.get("/getUsers", getAllUsers);//

router.get("/search", searchUsers);//

router.get("/filterUser",filterUsers)//

router.get("/fetchUser",fetchUser)

router.delete("/deleteUser/:_id",deleteUser)

router.post("/createTeam", createTeam)//

router.get("/getTeams", getAllTeams);//

router.get("/getSingleTeam/:_id", fetchSingleTeam);//

router.delete("/deleteTeam/:_id", deleteTeam);//

router.use(errorHandler);

module.exports = router;
