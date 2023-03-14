const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();
const { dataController, apiController } = require("../controllers/taskCtrl");

// Index
router.get("/", dataController.index, apiController.index);
// Index not completed
router.get("/incompleted", dataController.indexNotComplete, apiController.index);
// Index completed
router.get("/completed", dataController.indexComplete, apiController.index);
// Delete
router.delete("/:id", dataController.destroy, apiController.show);
// Update
router.put("/:id", dataController.update, apiController.show);
// Create
router.post("/", dataController.create, apiController.show);
// Show
router.get(":/id", dataController.show, apiController.show);
/* // Add Task for Child
router.put("/", dataController.create, apiController.addChild);
// Remove Task for Child
router.put("/", dataController.create, apiController.removeChild); */

module.exports = router;
