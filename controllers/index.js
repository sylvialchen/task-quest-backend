const mongoose = require ('mongoose')

module.exports = {
    Reward: require('./Reward'),
    caregiverCtrl: require("./caregiverCtrl")
};

mongoose.connect( process.env.MONGODB_URL);

