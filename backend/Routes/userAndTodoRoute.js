const express = require("express");
const errorHandler = require("../Middleware/errorHandler");
const {
  getAllUsers, searchUsers, filterUsers, fetchUser
} = require("../Controller/userController");

const {createTeam} = require("../Controller/teamController")

const router = express.Router();

router.get("/getUsers", getAllUsers);

router.get("/search", searchUsers);

router.get("/filterUser",filterUsers)
router.get("/fetchUser",fetchUser)

router.post("/createTeam", createTeam)


router.use(errorHandler);

module.exports = router;
