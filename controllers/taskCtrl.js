const CaregiverModel = require("../models/CaregiverModel");
const Child = require("../models/ChildModel");
const Task = require("../models/TaskModel");

// Get all tasks associated with a caregiver
async function getAllTasksForCaregiver(req, res, next) {
  try {
    const tasks = await Task.find({ caregiverId: req.params.caregiverId });
    res.json(tasks);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Create a new task
async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json(error);
  }
}


// Get all completed tasks associated with a caregiver
async function getCompletedTasksForCaregiver(req, res, next) {
  try {
    const caregiverId = req.params.caregiverId;
    const tasks = await Task.find({ caregiverId: caregiverId, completed: true });
    res.json(tasks);
  } catch (error) {
    res.status(400).json(error);
  }
}


// Get all incomplete tasks associated with a caregiver
async function getIncompleteTasks(req, res, next) {
  try {
    const caregiverId = req.params.caregiverId;
    const tasks = await Task.find({ caregiverId: caregiverId, completed: false });
    res.json(tasks);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Get a task by ID
async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Update a task by ID
async function updateTask(req, res, next) {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Delete a task by ID
async function deleteTask(req, res, next) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.json(deletedTask);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Assign a task to a child
async function assignTaskToChild(req, res, next) {
  try {
    const updatedChild = await Child.findByIdAndUpdate(
      req.params.childId,
      { $push: { taskArray: req.params.taskId } },
      { new: true }
    );
    res.send(updatedChild);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Mark a task as completed and award points to a child
async function completeTask(req, res) {
  try {
    const completedTask = await Task.findByIdAndUpdate(req.params.taskId, {
      $set: { completed: true },
    });

    const points = completedTask.taskPoints;
    console.log(points);

    const child = await Child.findByIdAndUpdate(
      { _id: req.params.childId },
      {
        $inc: { totalPoints: points },
      }
    );
    console.log(child.totalPoints);
    await child.save();
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json(error);
  }

};

const taskCtrl = {
  getAllTasksForCaregiver,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  assignTaskToChild,
  completeTask,
  getCompletedTasksForCaregiver,
  getIncompleteTasks
};

module.exports = taskCtrl;
