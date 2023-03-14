const ChildModel = require("../models/ChildModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create
const createChild = async (req, res) => {
    try {
        // get child data
        const { firstName, lastName, email, password } = req.body;

        // validate
        if (!(firstName && lastName && email && password)) {
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
            firstName,
            lastName,
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
    createChild,
};

module.exports = childCtrl;
