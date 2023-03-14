const mongoose = require ('mongoose')

module.exports = {
    Reward: require('./rewardCtrl'),
    caregiverCtrl: require("./caregiverCtrl")
};

mongoose.connect( process.env.MONGODB_URL);

