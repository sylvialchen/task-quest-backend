const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

/* controller */
const controllers = require("../controllers/index.js");

/* Routes */
// show all rewards
router.get("/all", controllers.rewardCtrl.showAllRewards)
// create reward
router.post("/create", controllers.rewardCtrl.createReward)
// assign reward to child
router.post("/:rewardId/:childId", controllers.rewardCtrl.assignToChild)



/*  */
module.exports = router;
