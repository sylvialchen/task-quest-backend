const mongoose = require("mongoose");

module.exports = {
    Reward: require('./rewardCtrl'),
    caregiverCtrl: require("./caregiverCtrl"),
    childCtrl: require('./childCtrl')
};

mongoose.connect(process.env.MONGODB_URL);
