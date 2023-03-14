const mongoose = require("mongoose");

// const ObjectId = mongoose.Schema.Types.ObjectId;

const CaregiverSchema = new mongoose.Schema({
  caregiverName: {
    type: String,
    required: [true, "First Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  token: {
    type: String,
  },
  relationshipToChild: {
    type: String,
  },
});

const Caregivers = mongoose.model("Caregivers", CaregiverSchema);

module.exports = Caregivers;
