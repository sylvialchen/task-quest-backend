import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const Caregiver = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
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
  toDo: {
    type: [ObjectId],
  },
});

const CaregiverModel = mongoose.model("CaregiverModel", Caregiver);

export default CaregiverModel;
