const express = require("express");
const router = express.Router();
const RewardModel = require("../models/RewardModel");
const ChildModel = require("../models/ChildModel");
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

const showAllRewards = async (req, res) => {
  try {
    const allRewards = await RewardModel.find({});
    res.status(200).json(allRewards);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
};

// router.post("/", verifyToken, async (req, res, next) =>  {
//     try {
//         const createReward = await Reward.create(req.body)
//         res.status(201).json(createReward)
//     } catch(err){
// 		res.status(400).json({error: "error"})
//         return next(err)
//     }
// });

const createReward = async (req, res) => {
  try {
    const createReward = await RewardModel.create(req.body);
    res.status(201).json(createReward);
  } catch (err) {
    res.status(400).json({ error: "error" });
    return next(err);
  }
};
const assignToChild = async (req, res) => {
  try {
    const foundChild = await ChildModel.findByIdAndUpdate(
      req.params.childId,
      { $push: { rewardsArray: req.params.rewardId } },
      { new: true }
    );
    res.send(foundChild);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "error" });
    return next(err);
  }
};

const rewardCashedIn = async (req, res) => {
  try {
    const cashInReward = await RewardModel.findByIdAndUpdate(
      { _id: req.params.rewardId },
      {
        $inc: { cashedIn: 1 },
      }
    );

    const points = cashInReward.rewardPoints;
    console.log(points);

    const child = await ChildModel.findById(req.params.childId);
    let newTotalPoints = child.totalPoints - points;
    console.log(newTotalPoints);
    // const child = await ChildModel.findByIdAndUpdate(
    //   { _id: req.params.childId },
    //   {
    //     $inc: { totalPoints: -points },
    //   }
    // );
    // console.log(child.totalPoints);
    if (newTotalPoints < 0) {
      newTotalPoints = child.totalPoints;
      res.status(400).send("Not enough points");
    }

    const updateChild = await ChildModel.findByIdAndUpdate(req.params.childId, {
      totalPoints: newTotalPoints,
    });
    console.log(child.totalPoints);

    return res.status(200).json({
      status: 200,
      updateChild,
      message: "Success rward cashed in",
      requestAt: new Date().toLocaleString(),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const rewardCtrl = {
  showAllRewards,
  createReward,
  assignToChild,
  rewardCashedIn,
};

module.exports = rewardCtrl;