const express = require('express')
const router = express.Router()
const {Reward} = require('../models/index')
const verifyToken = require("../middleware/auth.js");


// SHOW ROUTE
router.get("/", verifyToken, async (req, res, next) => {
	try {
		const allRewards = await Reward.find({})
		res.status(200).json(allRewards)
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});
router.post("/", verifyToken, async (req, res, next) =>  {
    try {
        const createReward = await Reward.create(req.body)
        res.status(201).json(createReward)
    } catch(err){
		res.status(400).json({error: "error"})
        return next(err)
    }
});


///yet to test
router.get("/:id", async (req, res, next) => {
	try {	
		const singleReward = await Reward.findById(req.params.id)
		console.log(singleReward, "the single reward")
		res.status(200).json(singleReward)
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});

router.put("/:id", async (req, res, next) => {
	try{
		const updatedTweet = await Tweet.findByIdAndUpdate(req.params.id, req.body)
		console.log(updatedTweet)
		res.status(200).json({message: "Successfully updated tweet", updatedTweet})
	}catch(error){
		res.status(400).json({error: "error"})
        return next(err)
	}
});
router.delete("/:id", async (req, res, next) => {
	try{
		const deletedTweet = await Tweet.findByIdAndDelete(req.params.id)
		console.log(deletedTweet)
		res.status(200).json({message: "Deleted Tweet", deletedTweet })	
	}catch(err){
		res.status(400).json({error: "error"})
        return next(err)
	}
});


module.exports = router