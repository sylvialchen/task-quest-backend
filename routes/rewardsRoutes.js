const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

/* controller */
const controllers = require("../controllers/index.js");

/* Routes */
// show all rewards associated with caregiver
router.get("/show/:caregiverId", controllers.rewardCtrl.showAllRewardsforCaregiver);
// Get all uncashed rewards associated with a caregiver
router.get("/show/uncashed/:caregiverId", controllers.rewardCtrl.showAllUnCashedRewardsForCaregiver);
// Get all cashed rewards associated with a caregiver
router.get("/show/cashed/:caregiverId", controllers.rewardCtrl.showAllCashedInRewardsForCaregiver);
// Delete a reward by ID
router.delete("/:id", controllers.rewardCtrl.deleteReward);
// Update a reward by ID
router.put("/:id", controllers.rewardCtrl.updateReward);
// create reward
router.post("/create", controllers.rewardCtrl.createReward);
// assign reward to child
router.post("/:rewardId/:childId", controllers.rewardCtrl.assignToChild);
router.put(
    "/cashin/:rewardId/:childId",
    verifyToken,
    controllers.rewardCtrl.rewardCashedIn
);

/*  */
module.exports = router;
