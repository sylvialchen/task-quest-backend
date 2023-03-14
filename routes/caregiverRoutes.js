const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

/* controller */
const controllers = require("../controllers/index.js");

/* Routes */

// register route
router.post("/register", controllers.caregiverCtrl.register);
// login route
router.post("/login", controllers.caregiverCtrl.login);
// find children
router.get("/:caregiverId", controllers.caregiverCtrl.findChildren);

/*  */

module.exports = router;
