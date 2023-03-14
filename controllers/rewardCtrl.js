const express = require('express')
const router = express.Router()
const RewardModel = require('../models/RewardModel')
// const verifyToken = require("../middleware/auth.js");


// Show All Rewards
// router.get("/", async (req, res, next) => {
// 	try {
// 		const allRewards = await Reward.find({})
// 		res.status(200).json(allRewards)
// 	}catch(err){
// 		res.status(400).json({error: "error"})
//         return next(err)
// 	}
// });

const showAllRewards = async(req, res) => {
    try {
		const allRewards = await RewardModel.find({})
		res.status(200).json(allRewards)
    } catch (err) {
        res.status(400).json({error: "error"})
        return next(err)
    }
}

// router.post("/", verifyToken, async (req, res, next) =>  {
//     try {
//         const createReward = await Reward.create(req.body)
//         res.status(201).json(createReward)
//     } catch(err){
// 		res.status(400).json({error: "error"})
//         return next(err)
//     }
// });

const createReward = async(req, res) => {
    try {
        const createReward = await RewardModel.create(req.body)
        res.status(201).json(createReward)
    } catch (err) {
		res.status(400).json({error: "error"})
        return next(err)
    }
}


const rewardCtrl = {
    showAllRewards,
    createReward,
};


module.exports = rewardCtrl
