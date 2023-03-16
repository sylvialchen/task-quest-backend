const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

/* controller */
const controllers = require("../controllers/index.js");

/* Routes */

// login route
router.post("/login", controllers.childCtrl.login);
// create child
router.post("/create", verifyToken, controllers.childCtrl.createChild);
// show childs data
router.get("/:childId", controllers.childCtrl.getChildById)
// // show pending tasks
// router.get("tasks/pendingtoday")
// // show cashed rewards
// router.get("rewards/cashed")
// // show uncashed rewards
// router.get("rewards/uncashed")

/*  */

module.exports = router;
