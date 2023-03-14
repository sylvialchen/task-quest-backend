const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();
const { dataController, apiController } = require("../controllers/taskCtrl");

// Index
router.get("/", dataController.index);
// Index not completed
router.get("/incompleted", dataController.indexNotComplete);
// Index completed
router.get("/completed", dataController.indexNotComplete);
// Delete
router.delete("/:id", dataController.destroy);
// Update
router.put("/:id", dataController.update);
// Create
router.post("/", dataController.create);
// Show
router.get(":/id", dataController.show);
// Assing Task to Child
router.post("/:taskID/:childId", dataController.assignToChild);
// Remove Task for Child
// router.put("/", dataController.create, apiController.removeChild); 

module.exports = router;
