const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

/* controller */
const controllers = require("../controllers/index.js");

/* Routes */
// show all rewards
router.get("/rewards", controllers.rewardCtrl.showAllRewards)
// create reward
router.post("rewards", controllers.rewardCtrl.createReward)


/*  */
module.exports = router;
