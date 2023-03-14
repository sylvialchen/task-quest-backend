const mongoose = require("mongoose");

module.exports = {
  rewardCtrl: require("./rewardCtrl"),
  caregiverCtrl: require("./caregiverCtrl"),
  childCtrl: require("./childCtrl"),
  taskCtrl: require("./taskCtrl"),
};

mongoose.connect(process.env.MONGODB_URL);
