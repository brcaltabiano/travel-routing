const fs = require('fs');
const path = require('path');

const readInput = () => {
  try {
    const file = fs.readFileSync(path.join(__dirname, '../../input-routes.csv'), {
      encoding: 'utf-8',
    });
    const rows = file
      .split('\n')
      .map(row => row.split(','))
      .filter(row => row.length === 3);
    const tracks = {};
    rows.forEach(row => {
      Object.assign(tracks, { [row[0]]: { ...tracks[row[0]], [row[1]]: Number(row[2]) } });
    });
    return tracks;
  } catch (err) {
    throw err;
  }
};

const getMinRoute = (tracks, node, destiny, myPath, cost = 0) => {
  if (node === destiny) return { path: myPath, cost };
  if (!tracks[node]) return { path: null, cost: Number.MAX_VALUE };
  const routes = Object.entries(tracks[node]).map(track => {
    const next = getMinRoute(tracks, track[0], destiny, `${myPath}-${track[0]}`, cost + track[1]);
    return next;
  });
  return routes.reduce(
    (minRoute, route) => (route.cost < minRoute.cost ? route : minRoute),
    routes[0]
  );
};

const calculateBestRoute = (origin, destiny) => {
  try {
    const tracks = readInput();
    const minRoute = getMinRoute(tracks, origin, destiny, origin);
    return minRoute.path !== null ? minRoute.path : `Impossible to reach ${destiny}`;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  calculateBestRoute,
};
