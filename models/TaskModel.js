const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const TaskSchema = new mongoose.Schema({
    caregiverId: {
        type: [ObjectId],
    },
    taskName: { 
        type: String, 
        required: true
    },
    completed: {
        type: Boolean,
    },
    image: {
        type: String,
    },
    taskPoints: { 
        type: Number, 
        required: true},
    dueDate: {
        type: Date
    }
})

const Tasks = mongoose.model('Tasks', TaskSchema);

module.exports = Tasks;