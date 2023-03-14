const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ChildSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    caregiverId: {
        type: ObjectId,
        required: true
    },
    childName: {
        type: String,
        required: [true, "First Name is required"],
    },
    username: {
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
=======
  caregiverId: {
    type: [ObjectId],
  },
  childName: {
    type: String,
    required: true,
  },
  username: {
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
    type: Number,
  },
>>>>>>> Stashed changes
});

const Children = mongoose.model("Children", ChildSchema);

module.exports = Children;
