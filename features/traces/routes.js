const createTrace = require('./commands/create-trace');

module.exports = (path, router) => {
  router.post(path, createTrace);
};
