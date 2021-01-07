const readline = require('readline');
const { calculateBestRoute } = require('../features/queries/repository');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const myConsole = () => {
  try {
    rl.question('please enter the route: ', input => {
      const [origin, destiny] = input.split('-');
      if (!origin || !destiny) {
        console.log('Wrong input. Usage: <origin>-<destiny>');
      } else {
        const route = calculateBestRoute(origin, destiny);
        console.log('best route:', route);
      }
      myConsole();
    });
  } catch (err) {
    console.log(err);
  }
};

rl.on('close', () => {
  console.log('\nsee you soon!');
  process.exit(0);
});

module.exports = myConsole;
