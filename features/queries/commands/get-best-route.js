const { calculateBestRoute } = require('../repository');

const getBestRoute = (req, res) => {
  try {
    const { origin, destiny } = req.query;
    if (!origin) res.status(400).send("'origin' is required");
    else if (!destiny) res.status(400).send("'destiny' is required");
    else {
      const route = calculateBestRoute(origin, destiny);
      res.send(route);
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = getBestRoute;
