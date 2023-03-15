const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();
const { dataController, apiController } = require("../controllers/taskCtrl");

// Index
router.get("/:caregiverId/tasks", dataController.index);
// Index not completed
router.get("/:caregiverId/incompleted", dataController.indexNotComplete);
// Index completed
router.get("/:caregiverId/completed", dataController.indexComplete);
// Delete
router.delete("/:id", dataController.destroy);
// Update
router.put("/:id", dataController.update);
// Create
router.post("/", dataController.create);
// Show
router.get("/:id", dataController.show);
router.get("/childtask/:childId", dataController.getTaskPerChild);
// Assing Task to Child
router.post("/:taskId/:childId", dataController.assignToChild);
// Remove Task for Child
// router.put("/", dataController.create, apiController.removeChild);
// Complete Task
router.put("/complete/:taskId/:childId", dataController.completeTask);

module.exports = router;
