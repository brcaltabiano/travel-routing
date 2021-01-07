const { insertTrace } = require('../repository');

const createTrace = (req, res) => {
  try {
    insertTrace(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = createTrace;
