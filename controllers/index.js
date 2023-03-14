const mongoose = require("mongoose");

module.exports = {
<<<<<<<<< Temporary merge branch 1
    Reward: require('./Reward'),
    caregiverCtrl: require("./caregiverCtrl"),
    childCtrl: require('./childCtrl')
=========
  Reward: require("./rewardCtrl"),
  caregiverCtrl: require("./caregiverCtrl"),
>>>>>>>>> Temporary merge branch 2
};

mongoose.connect(process.env.MONGODB_URL);
