const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    name: { type: String, required: true},
    completed: Boolean,
    image: String,
    taskPoints: { type: Number, required: true},
    childID: Array,
    date: Date,
    dueDate: Date
})

const Task = model('Task', taskSchema);

module.exports = Task;