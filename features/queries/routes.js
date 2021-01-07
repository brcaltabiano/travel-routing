const getBestRoute = require('./commands/get-best-route');

module.exports = (path, router) => {
  router.get(`${path}/traces`, getBestRoute);
};
