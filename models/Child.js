const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: [true, "First Name is required"],
          },
          lastName: {
            type: String,
            required: [true, "Last Name is required"],
          },
          tasks: {
            type: Array
          },
        rewards: {
            type: Array
        },
        totalPoints: {
            type: Number
        }
    },
);

const Child = mongoose.model("Child", childSchema);


module.exports = Child