const express = require('express');

const router = express.Router();

const mountTracesRoutes = require('../features/traces/routes');
const mountQueriesRoutes = require('../features/queries/routes');

mountTracesRoutes('/traces', router);
mountQueriesRoutes('/queries', router);

module.exports = router;
