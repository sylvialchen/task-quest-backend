const express = require('express')
const router = express.Router()
const {Reward} = require('../models/index')

// SHOW ROUTE
router.get("/", async (req, res, next) => {
	try {
		const allRewards = await Reward.find({})
		res.status(200).json(allRewards)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});
router.post("/", async (req, res, next) =>  {
    try {
        const createReward = await Reward.create(req.body)
        res.status(201).json(createReward)
    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});

module.exports = router