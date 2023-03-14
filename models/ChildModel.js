const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ChildSchema = new mongoose.Schema({
    caregiverId: {
        type: [ObjectId],
    },
    childName: {
        type: String,
        required: [true, "First Name is required"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    taskArray: {
        type: [ObjectId],
    },
    rewardsArray: {
        type: [ObjectId],
    },
    totalPoints: {
        type: Number
    }
});

const Children = mongoose.model("Children", ChildSchema);


module.exports = Children;