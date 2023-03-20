const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const ChildSchema = new mongoose.Schema({
  caregiverId: {
    type: ObjectId,
    required: true,
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
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
});

const Children = mongoose.model("Children", ChildSchema);

module.exports = Children;
