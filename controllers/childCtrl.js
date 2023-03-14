const ChildModel = require("../models/ChildModel");
const express = require(`express`)
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
      email: child.email,
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
    try {
        // get child data
        const { caregiverId, childName, email, password } = req.body;

        // validate
        if (!(caregiverId, childName && email && password)) {
            res.status(400).send("All inputs are required!");
        }

        // check if child already exist
        const existingChild = await ChildModel.findOne({ email });
        if (existingChild) {
            return res
                .status(409)
                .send("Email account already exist. Try a new email account!");
        }

        // encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user in database
        const child = await ChildModel.create({
            caregiverId,
            childName,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        res.status(201).json({
            status: 201,
            message: "child was created successfully",
            child,
        });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const childCtrl = {
    login,
    createChild,
};

module.exports = childCtrl;

