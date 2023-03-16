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
// get child by ID
router.get("/:id", controllers.childCtrl.getChildById);

/*  */

module.exports = router;
