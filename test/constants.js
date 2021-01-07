const defaultRoutes =
  'GRU,BRC,10\nBRC,SCL,5\nGRU,CDG,75\nGRU,SCL,20\nGRU,ORL,56\nORL,CDG,5\nSCL,ORL,20\n';

const defaultExpectedRoutes = [
  {
    origin: 'GRU',
    destiny: 'CDG',
    answer: 'GRU-BRC-SCL-ORL-CDG',
  },
  {
    origin: 'BRC',
    destiny: 'CDG',
    answer: 'BRC-SCL-ORL-CDG',
  },
];

const newTraces = [
  {
    origin: 'BRC',
    destiny: 'FRA',
    cost: 10,
  },
  {
    origin: 'FRA',
    destiny: 'CDG',
    cost: 7,
  },
];

const newExpectedRoutes = [
  {
    origin: 'GRU',
    destiny: 'CDG',
    answer: 'GRU-BRC-FRA-CDG',
  },
  {
    origin: 'BRC',
    destiny: 'CDG',
    answer: 'BRC-FRA-CDG',
  },
];

module.exports = {
  defaultRoutes,
  defaultExpectedRoutes,
  newTraces,
  newExpectedRoutes,
};
