const mongoose = require ('mongoose')

module.exports = {
    Reward: require('./Reward'),
    Child: require('./Child')
};

mongoose.connect( process.env.MONGODB_URL);
