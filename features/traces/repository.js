const fs = require('fs');
const path = require('path');

const insertTrace = body => {
  try {
    const { origin, destiny, cost } = body;
    const row = `${origin},${destiny},${cost}\n`;
    fs.appendFileSync(path.join(__dirname, '../../input-routes.csv'), row, {
      encoding: 'utf-8',
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  insertTrace,
};
