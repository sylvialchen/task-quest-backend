const mongoose = require("mongoose")

const RewardSchema = new mongoose.Schema({
    date: {type: String},
    name: {type: String, required: true},
    image: {type: String},
    rewardPoints: {type: Number, required: true},
    active: {type: Boolean},
    cashedIn: {type: Number, required: true}
})

const Reward = mongoose.model("Reward", RewardSchema)

module.exports = Reward