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
      const child = await Child.findOne({ username: username });
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

  const childCtrl = {
    login,
  };
  
  module.exports = childCtrl;