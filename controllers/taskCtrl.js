const Task = require('../models/task');

const dataController = {
    async index (req, res, next) {
        try {
            const tasks = await Task.find({});
            res.locals.data.tasks = tasks;
            next();
        } catch (error) {
            res.status(400).json(error)
        }
    },
    async create (req, res, next) {
        try {
            const task = await Task.create(req.body);
            console.log(task);
            res.locals.task = task;
            next();
        } catch (error) {
            
        }
    },
    async indexComplete (req, res, next) {
        try {
            const tasks = await Task.find({ completed: true });
            res.locals.data.tasks = tasks;
            next();
        } catch (error) {
            res.status(400).json(error)
        }
    },
    async indexNotComplete (req, res, next) {
        try {
            const tasks = await Task.find({ completed: false })
            res.locals.data.tasks = tasks;
            next();
        } catch (error) {
            res.status(400).json(error);
        }
    },
    async show(req, res, next){
        try {
            const task = await Task.findById(req.params.id);
            res.locals.data.task = task;
            next();
        } catch (error) {
            res.status(400).json(error);       
        }
    },
    async update(req, res, next){
        try {
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new : true })
            res.locals.data.task = task
            next()
        } catch (error) {
            res.status(400).json(error)       
        }
    },
    async destroy (req, res, next) {
        try {
            const task = await Task.findByIdAndDelete(req.params.id);
            res.locals.data.task = task;
            next();
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

const apiController = {
    index (req, res, next) {
        res.json(res.locals.data.tasks);
    },
    show (req, res, next) {
        res.json(res.locals.data.task);
    }
}

module.exports = { dataController, apiController };