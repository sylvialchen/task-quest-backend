const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();

/* controller */
const controllers = require("../controllers/index.js");

/* Routes */

// login route
router.post("/login", controllers.childCtrl.login);
router.post("/create", controllers.childCtrl.createChild);

/*  */

module.exports = router;
