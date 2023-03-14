const CaregiverModel = require("../models/CaregiverModel");
const Child = require("../models/ChildModel");
const Task = require("../models/TaskModel");
const { tasksRoutes } = require("../routes");

const dataController = {
  async index(req, res, next) {
    try {
      const tasks = await Task.find({});
      console.log(tasks);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async create(req, res, next) {
    try {
      const task = await Task.create(req.body);
      console.log(task);
      res.status(201).json(task);
    } catch (error) {}
  },
  async indexComplete(req, res, next) {
    try {
      const tasks = await Task.find({ completed: true });
      console.log(tasks);
      res.status(200).json(tasks);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async indexNotComplete(req, res, next) {
    try {
      const tasks = await Task.find({ completed: false });
      console.log(tasks);
      res.status(200).json(tasks);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async show(req, res, next) {
    try {
      const task = await Task.findById(req.params.id);
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async update(req, res, next) {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      res.status(200).json(task);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async assignToChild(req, res, next) {
    try {
      const foundChild = await Child.findByIdAndUpdate(
        req.params.childId,
        { $push: { taskArray: req.params.taskId } },
        { new: true }
      );
      res.send(foundChild);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async completeTask(req, res) {
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
  },
};

const apiController = {
  index(req, res, next) {
    // res.json(res.locals.data.tasks);
  },
  show(req, res, next) {
    // res.json(res.locals.data.task);
  },
};

module.exports = { dataController, apiController };
