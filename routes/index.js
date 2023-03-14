const caregiverRoutes = require("./caregiverRoutes");
const childRoutes= require('./childRoutes')
const tasksRoutes = require('./tasksRoutes');
const rewardsRoutes = require('./rewardsRoutes')

const router = {
  caregiverRoutes,
  childRoutes,
  tasksRoutes,
  rewardsRoutes
};

module.exports = router;
