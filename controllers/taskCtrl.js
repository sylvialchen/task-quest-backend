const CaregiverModel = require("../models/CaregiverModel");
const Child = require("../models/ChildModel");
const Task = require("../models/TaskModel");
const { tasksRoutes } = require("../routes");

const dataController = {
  async index(req, res, next) {
    try {
      res.json(await Task.find({ caregiverId: req.params.caregiverId }));
    } catch {
      res.status(400).json(error);
    }
  },
  async create(req, res, next) {
    try {
      res.json(await Task.create(req.body));
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async indexComplete(req, res, next) {
    try {
      const completedTask = await Task.find({
        caregiverId: req.params.caregiverId,
        completed: true,
      });

      res.status(201).json({
        status: 201,
        completedTask,
        message: "Successful reading all completed task",
        requestAt: new Date().toLocaleString(),
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async indexNotComplete(req, res, next) {
    try {
      const incompletedTask = await Task.find({
        caregiverId: req.params.caregiverId,
        completed: false,
      });

      res.status(201).json({
        status: 201,
        incompletedTask,
        message: "Successful reading all completed task",
        requestAt: new Date().toLocaleString(),
      });
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async show(req, res, next) {
    try {
      res.json(await Task.findById(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async update(req, res, next) {
    try {
      res.json(
        await Task.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
      );
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async destroy(req, res, next) {
    try {
      res.json(await Task.findByIdAndDelete(req.params.id));
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

module.exports = { dataController };
