const express = require("express");
const router = express.Router();
const RewardModel = require("../models/RewardModel");
const ChildModel = require("../models/ChildModel");
const verifyToken = require("../middleware/auth.js");

const showAllRewardsforCaregiver = async (req, res, next) => {
    const caregiverId = req.params.caregiverId;
    try {
        const allRewards = await RewardModel.find({ caregiverId: caregiverId });
        res.status(200).json(allRewards);
    } catch (err) {
        res.status(400).json({ error: "error" });
        return next(err);
    }
};

const createReward = async (req, res, next) => {
    try {
        const createReward = await RewardModel.create(req.body);
        res.status(201).json(createReward);
    } catch (err) {
        res.status(400).json({ error: "error" });
        return next(err);
    }
};

const assignToChild = async (req, res, next) => {
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

const rewardCashedIn = async (req, res, next) => {
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
        } else {

        const updateChild = await ChildModel.findByIdAndUpdate(req.params.childId, {
            totalPoints: newTotalPoints,
        });
        console.log(child.totalPoints);

        return res.status(200).json({
            status: 200,
            updateChild,
            message: "Success reward cashed in",
            requestAt: new Date().toLocaleString(),
        });
    }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateReward = async (req, res, next) => {
    try {
        const updatedReward = await Reward.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedReward);
    } catch (error) {
        res.status(400).json(error);
    }
}

const deleteReward = async (req, res, next) => {
    try {
        const deletedReward = await Reward.findByIdAndDelete(req.params.id);
        res.json(deletedReward);
    } catch (error) {
        res.status(400).json(error);
    }
}

const showAllCashedInRewardsForCaregiver = async (req, res, next) => {
    try {
        const caregiverId = req.params.caregiverId;
        const cashedRewards = await RewardModel.find({ caregiverId: caregiverId, cashedIn: 0 });
        res.status(200).json(cashedRewards);
    } catch (err) {
        res.status(400).json({ error: "error" });
        return next(err);
    }
};

const showAllUnCashedRewardsForCaregiver = async (req, res, next) => {
    try {
        const caregiverId = req.params.caregiverId;
        const unCashedRewards = await RewardModel.find({ caregiverId: caregiverId, cashedIn: {$gt: 0} });
        res.status(200).json(unCashedRewards);
    } catch (err) {
        res.status(400).json({ error: "error" });
        return next(err);
    }
};

const rewardCtrl = {
    showAllRewardsforCaregiver,
    createReward,
    assignToChild,
    rewardCashedIn,
    updateReward,
    deleteReward,
    showAllCashedInRewardsForCaregiver,
    showAllUnCashedRewardsForCaregiver
};

module.exports = rewardCtrl;