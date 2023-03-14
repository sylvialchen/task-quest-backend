const caregiverRoutes = require("./caregiverRoutes");
const childRoutes= require('./childRoutes')
const tasks = require('./tasks');

const router = {
  caregiverRoutes,
  childRoutes,
  tasks
};

module.exports = router;
