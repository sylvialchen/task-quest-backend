const CaregiverModel = require("../models/CaregiverModel");
const Child = require("../models/ChildModel");
const Task = require("../models/TaskModel");

const dataController = {
  async index(req, res, next) {
    try {
      const tasks = await Task.find({});
      console.log(tasks)
      res.locals.data.tasks = tasks;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async create(req, res, next) {
    try {
      const task = await Task.create(req.body);
      console.log(task);
      res.locals.task = task;
      next();
    } catch (error) {}
  },
  async indexComplete(req, res, next) {
    try {
      const tasks = await Task.find({ completed: true });
      console.log(tasks)
      res.locals.data.tasks = tasks;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async indexNotComplete(req, res, next) {
    try {
      const tasks = await Task.find({ completed: false });
      console.log(tasks)
      res.locals.data.tasks = tasks;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async show(req, res, next) {
    try {
      const task = await Task.findById(req.params.id);
      res.locals.data.task = task;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async update(req, res, next) {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.locals.data.task = task;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async destroy(req, res, next) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      res.locals.data.task = task;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

const apiController = {
    index (req, res, next) {
        res.json(res.locals.data.tasks);
    },
    show (req, res, next) {
        res.json(res.locals.data.task);
    }

/*     await currentChild.save();
    res.status(200).send({
      data: currentChild,
      message: "Expense has been added to the Month",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${err.message}`,
      requestAt: new Date().toLocaleString(),
    });
  } */
};

const removeTaskFromChild = async (req, res) => {
  try {
    // get the req body
    const { taskId, childId } = req.body;

    const caregiverId = req.caregiver._id;
    // validate input
    if (!(taskId && childId)) {
      throw "inputError";
    }

    // get ID for user and month
    const currentCaregiver = await CaregiverModel.findById(caregiverId);
    const currentChild = await Child.findById(childId);
    const currentTask = await Task.findById(taskId);

    //find the index of the expense to add
    const index = currentChild.childId.indexOf(taskId);
    //add expense to the month
    currentChild.childId.splice(index, 1);

    await currentChild.save();
    res.status(200).send({
      data: currentChild,
      message: "Expense has been added to the Month",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `${err.message}`,
      requestAt: new Date().toLocaleString(),
    });
  }
};

const taskChild = {
  /* addTaskToChild, */
  removeTaskFromChild,
};

module.exports = { dataController, apiController };
