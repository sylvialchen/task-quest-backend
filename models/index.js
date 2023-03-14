const mongoose = require ('mongoose')

module.exports = {
    Reward: require('./Reward')
};

mongoose.connect( process.env.MONGODB_URL);
