const ChildModel = require("../models/ChildModel");
const express = require(`express`);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Login
const login = async (req, res) => {
  try {
    // get child input
    const { username, password } = req.body;

    // validate child input
    if (!(username && password)) {
      res.status(400).send("No input was entered");
    }

    // validate if child exist in database
    const child = await ChildModel.findOne({ username: username });
    if (!child)
      return res.status(400).json({ msg: "child account does not exist." });

    const isMatch = await bcrypt.compare(password, child.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid password" });

    const payload = {
      username: child.username,
      id: child._id,
    };
    const token = jwt.sign(
      payload,
      process.env.TOKEN_KEY,

      {
        expiresIn: "24h",
      }
    );

    //save child token
    child.token = token;

    // child
    res.status(200).json(child);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Create
const createChild = async (req, res) => {
<<<<<<< Updated upstream
    try {
        // get child data
        const { caregiverId, childName, username, password } = req.body;

        // validate
        if (!(caregiverId, childName && username && password)) {
            res.status(400).send("All inputs are required!");
        }

        // check if child already exist
        const existingChild = await ChildModel.findOne({ username });
        if (existingChild) {
            return res
                .status(409)
                .send("username account already exist. Try a new username account!");
        }

        // encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user in database
        const child = await ChildModel.create({
            caregiverId,
            childName,
            username: username.toLowerCase(),
            password: encryptedPassword,
        });

        res.status(201).json({
            status: 201,
            message: "child was created successfully",
            child,
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
=======
  try {
    // get child data
    const { caregiverId, childName, username, password } = req.body;

    // validate
    if (!(childName && username && password && caregiverId)) {
      res.status(400).send("All inputs are required!");
    }

    // check if child already exist
    const existingChild = await ChildModel.findOne({ username });
    if (existingChild) {
      return res
        .status(409)
        .send("username account already exist. Try a new username account!");
>>>>>>> Stashed changes
    }

    // encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in database
    const child = await ChildModel.create({
      childName,
      caregiverId,
      username: username.toLowerCase(),
      password: encryptedPassword,
    });

    console.log(child);

    res.status(201).json({
      status: 201,
      message: "child was created successfully",
      child,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// const findCompletedTasks = async(req, res) => {
//   try {
//       res.json(await TaskModel.find({"caregiverId": req.params.caregiverId}))
//   } catch (err) {
//       res.status(400).json({error: "error"})
//       return next(err)
//   }
// }

const childCtrl = {
<<<<<<< Updated upstream
    login,
    createChild,
    // findCompletedTasks
=======
  login,
  createChild,
>>>>>>> Stashed changes
};

module.exports = childCtrl;
