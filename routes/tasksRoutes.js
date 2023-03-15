const express = require("express");
const verifyToken = require("../middleware/auth.js");

const router = express.Router();
const controllers = require("../controllers/index.js");

// Get all tasks associated with a caregiver
router.get("/show/:caregiverId", controllers.taskCtrl.getAllTasksForCaregiver);
// Index not completed

router.get(
  "/show/incomplete/:caregiverId",
  controllers.taskCtrl.getIncompleteTasks
);
// Get all completed tasks associated with a caregiver
router.get(
  "/show/complete/:caregiverId",
  controllers.taskCtrl.getCompletedTasksForCaregiver
);
// Delete a task by ID
router.delete("/:id", controllers.taskCtrl.deleteTask);
// Update a task by ID
router.put("/:id", controllers.taskCtrl.updateTask);
// Create a new task
router.post("/", controllers.taskCtrl.createTask);
// Get a task by ID
router.get("/:id", controllers.taskCtrl.getTaskById);
// Assing Task to Child
router.post("/:taskId/:childId", controllers.taskCtrl.assignTaskToChild);
// Remove Task for Child
// router.put("/", dataController.create, apiController.removeChild);
// Complete Task
router.put("/complete/:taskId/:childId", controllers.taskCtrl.completeTask);

module.exports = router;
