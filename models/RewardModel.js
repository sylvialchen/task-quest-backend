const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId;

const RewardSchema = new mongoose.Schema({
    caregiverId: {
        type: [ObjectId],
    },
    rewardName: {
        type: String, 
        required: true
    },
    image: {
        type: String
    },
    rewardPoints: {
        type: Number, 
        required: true
    },
    activeReward: {
        type: Boolean
    },
    cashedIn: {
        type: Number, 
        required: true
    }
})

const Rewards = mongoose.model("Rewards", RewardSchema)

module.exports = Rewards