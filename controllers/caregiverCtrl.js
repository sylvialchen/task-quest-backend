/* Imports */
const CaregiverModel = require("../models/CaregiverModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/* Controller Work */

// register
const register = async (req, res) => {
  try {
    // get caregiver data
    const { firstName, lastName, email, password } = req.body;

    // validate
    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All inputs are required!");
    }

    // check if caregiver already exist
    const oldCaregiver = await CaregiverModel.findOne({ email });
    if (oldCaregiver) {
      return res
        .status(409)
        .send("Email account already exist. Try a new email account!");
    }

    // encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in database
    const caregiver = await CaregiverModel.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(201).json({
      status: 201,
      message: "caregiver was created successfully",
      caregiver,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// login
const login = async (req, res) => {
  try {
    // get caregiver input
    const { email, password } = req.body;

    // validate caregiver input
    if (!(email && password)) {
      res.status(400).send("No input was entered");
    }

    // validate if caregiver exist in database
    const caregiver = await CaregiverModel.findOne({ email: email });
    if (!caregiver)
      return res.status(400).json({ msg: "caregiver does not exist." });

    const isMatch = await bcrypt.compare(password, caregiver.password);
    if (!isMatch) return res.status(400).json({ msg: "invalid password" });

    const payload = {
      email: caregiver.email,
      id: caregiver._id,
    };
    const token = jwt.sign(
      payload,
      process.env.TOKEN_KEY,

      {
        expiresIn: "24h",
      }
    );

    //save caregiver token
    caregiver.token = token;

    // caregiver
    res.status(200).json(caregiver);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* End of Controller Work */

/* Export Out */

const caregiverCtrl = {
  register,
  login,
};

module.exports = caregiverCtrl;
